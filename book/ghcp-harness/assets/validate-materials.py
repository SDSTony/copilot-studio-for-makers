import argparse
from io import BytesIO
import re
from pathlib import Path
from xml.etree import ElementTree as ET
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parent
NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
      "s": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
      "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
      "a": "http://schemas.openxmlformats.org/drawingml/2006/main"}
PPT_FIELDS = {
    "DESTINATION", "START_DATE", "END_DATE", "PURPOSE", "SCHEDULE", "CHECKLIST",
    "ESTIMATED_TOTAL", "EXCESS_TOTAL", "REVIEW_RESULT", "COST_BREAKDOWN", "OPEN_ITEMS", "SOURCES",
}


def require(condition, message):
    if not condition:
        raise ValueError(message)


def validate_documents():
    for name in ("domestic-travel-policy", "expense-rules", "travel-checklist"):
        with ZipFile(ROOT / f"{name}.docx") as package:
            require(package.testzip() is None, f"Corrupt DOCX: {name}")
            document = ET.fromstring(package.read("word/document.xml"))
            actual = [p.text or "" for p in document.findall(".//w:t", NS)]
        source = (ROOT / "knowledge" / f"{name}.md").read_text(encoding="utf-8")
        expected = [re.sub(r"^#{1,2} |^- ", "", line)
                    for line in source.splitlines() if line.strip()]
        require(actual == expected, f"DOCX content differs from source: {name}")
    print("PASS: three Word documents match their sources")


def validate_workbook():
    with ZipFile(ROOT / "trip-plans.xlsx") as package:
        require(package.testzip() is None, "Corrupt workbook")
        table = ET.fromstring(package.read("xl/tables/table1.xml"))
        require(table.attrib["name"] == "TripPlans", "Wrong table name")
        headers = [col.attrib["name"] for col in table.findall("s:tableColumns/s:tableColumn", NS)]
        expected = ["PlanId", "Destination", "StartDate", "EstimatedTotal", "ReviewResult", "Status"]
        require(headers == expected, "Wrong Excel schema")
        require(table.attrib["ref"] == "A1:F3", "Wrong six-column table range")
        sheet = ET.fromstring(package.read("xl/worksheets/sheet1.xml"))
        require(not sheet.findall(".//s:c[@t='e']", NS), "Excel error cells")
        require(not sheet.findall(".//s:f", NS), "Record table should contain values, not formulas")
        rows = sheet.findall("s:sheetData/s:row", NS)
        require(len(rows) == 3, "Wrong sample row count")
        records = [
            ["SAMPLE-001", "광주", "2026-12-03", 287000, "한도 초과", "준비 중"],
            ["SAMPLE-002", "전주", "2026-12-08", 73000, "한도 이내", "완료"],
        ]
        for row, expected_record in zip(rows[1:], records):
            actual = []
            cells = row.findall("s:c", NS)
            require(len(cells) == 6, "Expected six cells per record")
            for cell in cells:
                if cell.attrib.get("t") == "inlineStr":
                    actual.append("".join(node.text or "" for node in cell.findall(".//s:t", NS)))
                else:
                    actual.append(int(cell.find("s:v", NS).text))
            require(actual == expected_record, f"Wrong sample record in row {row.attrib['r']}")
            require(cells[2].attrib.get("t") == "inlineStr", "StartDate must be ISO text")
    print("PASS: six-column Excel table and two complete sample records")


def validate_presentation(content):
    with ZipFile(BytesIO(content)) as package:
        require(package.testzip() is None, "Corrupt PPTX")
        slides = sorted(name for name in package.namelist()
                        if re.fullmatch(r"ppt/slides/slide\d+\.xml", name))
        require(len(slides) == 3, "Expected three template slides")
        presentation = ET.fromstring(package.read("ppt/presentation.xml"))
        ordering = [child.tag.split("}")[-1] for child in presentation]
        require(ordering.index("notesMasterIdLst") < ordering.index("sldIdLst"),
                "PPTX notes master list must precede slide list")
        require(not any("vbaProject" in name for name in package.namelist()), "PPTX must not contain macros")
        texts = []
        for name in package.namelist():
            if name.endswith((".xml", ".rels")):
                document = ET.fromstring(package.read(name))
                if name.endswith(".rels"):
                    require(not any(rel.attrib.get("TargetMode") == "External" for rel in document),
                            f"External relationship in {name}")
                if name in slides:
                    slide_text = "\n".join(node.text or "" for node in document.findall(".//a:t", NS))
                    require("PPTX-TRAVEL-REPORT-V1" in slide_text, f"Missing marker in {name}")
                    require("교육용 초안 · 승인 문서 아님" in slide_text, f"Missing disclaimer in {name}")
                    texts.append(slide_text)
                    for transform in document.findall(".//a:xfrm", NS):
                        offset, extent = transform.find("a:off", NS), transform.find("a:ext", NS)
                        if offset is not None and extent is not None:
                            x, y = int(offset.attrib["x"]), int(offset.attrib["y"])
                            w, h = int(extent.attrib["cx"]), int(extent.attrib["cy"])
                            require(x >= 0 and y >= 0 and x + w <= 12192000 and y + h <= 6858000,
                                    f"Shape outside wide slide: {name}")
        fields = set(re.findall(r"\{\{([A-Z_]+)\}\}", "\n".join(texts)))
        require(fields == PPT_FIELDS, f"Unexpected PPTX fields: {fields}")
    print("PASS: three-slide PPTX template, fields, bounds, disclaimers and no external resources")


def validate_skill():
    source = ROOT / "trip-plan-report"
    expected = {file.relative_to(source).as_posix(): file.read_bytes()
                for file in source.rglob("*") if file.is_file()}
    with ZipFile(ROOT / "trip-plan-report.zip") as package:
        require(package.testzip() is None, "Corrupt Skill ZIP")
        require(set(package.namelist()) == set(expected), "Skill ZIP has wrong files or extra parent folder")
        for name, content in expected.items():
            require(package.read(name) == content, f"Stale packaged resource: {name}")
    definition = expected["SKILL.md"].decode("utf-8").replace("\r\n", "\n")
    require(definition.startswith("---\nname: trip-plan-report\n"), "Skill metadata")
    require("description:" in definition.split("---", 2)[1], "Missing Skill description")
    validate_presentation(expected["assets/trip-plan-template.pptx"])
    print("PASS: packaged PPT Skill matches current sources")


def create_sample(output):
    values = {
        "DESTINATION": "부산", "START_DATE": "2026-11-10", "END_DATE": "2026-11-12",
        "PURPOSE": "고객사 요구사항 확인 및 제안 미팅",
        "SCHEDULE": "11/10: 이동 및 고객사 방문\n11/11: 요구사항·제안 범위 논의\n11/12: 후속 일정 확인 및 복귀\n방문 시간·장소: 미확인",
        "CHECKLIST": "고객 담당자와 방문 시간 확인\n출입 절차·준비물 확인\n일반석 교통편·숙박 견적 확인\n발표 자료와 장비 준비\n숙박 한도 초과 별도 검토",
        "ESTIMATED_TOTAL": "420,000원", "EXCESS_TOTAL": "40,000원",
        "REVIEW_RESULT": "숙박 한도 초과\n별도 검토 필요",
        "COST_BREAKDOWN": "왕복 교통비: 120,000원\n숙박: 150,000원 × 2박\n숙박 합계: 300,000원\n기타 비용: 0원",
        "OPEN_ITEMS": "방문 시간·장소 미확인\n숙박 한도 초과 40,000원\n실제 승인·예약·결제 아님",
        "SOURCES": "교육용 국내 출장 규정 / 숙박 기준 · 교육용 경비 기준 / 계산 방식",
    }
    require(set(values) == PPT_FIELDS, "Sample values do not match template")
    template = ROOT / "trip-plan-report" / "assets" / "trip-plan-template.pptx"
    require(output.resolve() != template.resolve(), "Sample output must not replace template")
    with ZipFile(template) as source, ZipFile(output, "w") as destination:
        for item in source.infolist():
            content = source.read(item.filename)
            if re.fullmatch(r"ppt/slides/slide\d+\.xml", item.filename):
                document = ET.fromstring(content)
                for node in document.findall(".//a:t", NS):
                    node.text = re.sub(r"\{\{([A-Z_]+)\}\}", lambda match: values[match[1]], node.text or "")
                content = ET.tostring(document, encoding="utf-8", xml_declaration=True)
                require(b"{{" not in content, "Sample has unfilled fields")
            destination.writestr(item, content)
    print(f"Created local synthetic visual QA sample: {output}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--sample-output", type=Path)
    args = parser.parse_args()
    validate_documents()
    validate_workbook()
    validate_skill()
    if args.sample_output:
        create_sample(args.sample_output)
