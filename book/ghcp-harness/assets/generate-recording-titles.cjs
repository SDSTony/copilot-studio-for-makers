const path = require("node:path");
const { spawnSync } = require("node:child_process");
const pptxgen = require("pptxgenjs");

const titles = [
  ["1 · 2", "Copilot Studio 소개 및\n실습 환경 준비"],
  ["3", "첫 에이전트 만들기와\nInstructions 작성"],
  ["4", "OneDrive 문서를\nKnowledge로 연결하기"],
  ["5-1", "Instructions 기반\nSkill 만들기"],
  ["5-2", "파일 기반 Skill로\n출장 PPT 템플릿 채우기"],
  ["6", "Excel 행 추가와\nOutlook 메일 조회"],
  ["7", "파일 발송·저장\nWorkflow 만들기"],
  ["8", "지식 기반 질문 2개로\nEvaluate 평가하기"],
  ["9", "에이전트 게시와\nMonitor 확인"],
  ["10", "업로드 파일 요약과\n이메일 자동 발송"],
];

async function main() {
  const deck = new pptxgen();
  deck.layout = "LAYOUT_WIDE";
  deck.author = "Copilot Studio for Makers";
  deck.subject = "GHCP 하네스 과정 촬영 구간 구분용 제목 슬라이드";
  deck.title = "GHCP 하네스 과정 · 실습 제목";
  deck.lang = "ko-KR";
  deck.theme = {
    headFontFace: "맑은 고딕",
    bodyFontFace: "맑은 고딕",
    lang: "ko-KR",
  };

  titles.forEach(([number, title], index) => {
    const slide = deck.addSlide();
    slide.background = { color: "131120" };
    slide.addShape(deck.ShapeType.roundRect, {
      x: 0.85, y: 1.55, w: 2.2, h: 0.55, radius: 0.12,
      fill: { color: "302442" }, line: { color: "302442", transparency: 100 },
    });
    slide.addText(`실습 ${number}`, {
      x: 1.05, y: 1.63, w: 1.85, h: 0.34,
      fontFace: "맑은 고딕", fontSize: 20, bold: true,
      color: "D8C6FF", margin: 0, breakLine: false,
    });
    slide.addText(title, {
      x: 0.85, y: 2.65, w: 9.25, h: 2.05,
      fontFace: "맑은 고딕", fontSize: 40, bold: true,
      color: "FFFFFF", margin: 0, valign: "mid",
      paraSpaceAfterPt: 10, lineSpacingMultiple: 1.12,
    });
    [
      { x: 10.65, y: 2.1, color: "A98AF5" },
      { x: 11.25, y: 2.8, color: "6C8CF5" },
      { x: 10.65, y: 3.5, color: "70D9CB" },
    ].forEach(({ x, y, color }) => {
      slide.addShape(deck.ShapeType.roundRect, {
        x, y, w: 0.42, h: 1.5, rotate: 38,
        rectRadius: 0.2, fill: { color },
        line: { color, transparency: 100 },
      });
    });
    slide.addText("GHCP 하네스 과정", {
      x: 0.85, y: 6.2, w: 5.5, h: 0.35,
      fontFace: "맑은 고딕", fontSize: 16, color: "ADA8C0", margin: 0,
    });
    slide.addText(`${String(index + 1).padStart(2, "0")} / ${titles.length}`, {
      x: 11.25, y: 6.2, w: 1.1, h: 0.35,
      fontFace: "Aptos", fontSize: 16, color: "ADA8C0", margin: 0, align: "right",
    });
    titles.forEach((_, position) => {
      slide.addShape(deck.ShapeType.rect, {
        x: 0.85 + position * 0.36, y: 6.85, w: 0.25, h: 0.055,
        fill: { color: position === index ? "B79BF7" : "3D374E" },
        line: { transparency: 100 },
      });
    });
    slide.addNotes(`촬영 구간 구분용. 실습 ${number}. ${title.replace("\n", " ")}.`);
  });

  const output = path.join(__dirname, "ghcp-harness-recording-titles.pptx");
  await deck.writeFile({ fileName: output });
  const result = spawnSync("powershell.exe", [
    "-NoProfile", "-ExecutionPolicy", "RemoteSigned", "-File",
    path.join(__dirname, "normalize-presentation.ps1"),
    "-Path", output, "-ExpectedSlideCount", String(titles.length),
  ], { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`PowerPoint normalization failed: ${result.status}`);
  console.log(`Created ${titles.length} recording title slides: ${output}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
