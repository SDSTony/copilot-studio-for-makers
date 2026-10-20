const path = require("node:path");
const pptxgen = require("pptxgenjs");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Copilot Studio for Makers";
pptx.subject = "GHCP travel lab template";
pptx.title = "출장 계획 브리핑 · 교육용 템플릿";
pptx.lang = "ko-KR";
pptx.theme = { headFontFace: "Malgun Gothic", bodyFontFace: "Malgun Gothic", lang: "ko-KR" };
const colors = { dark: "123B3A", teal: "237A70", paper: "F4F3EC", ink: "183C39",
  muted: "526C66", accent: "E6B65C", white: "FFFFFF" };

function text(slide, value, x, y, w, h, options = {}) {
  slide.addText(value, { x, y, w, h, fontFace: "Malgun Gothic", fontSize: 16,
    color: colors.ink, margin: 0, breakLine: false, valign: "mid",
    ...options });
}

function base(title, number, dark = false) {
  const slide = pptx.addSlide();
  slide.background = { color: dark ? colors.dark : colors.paper };
  const foreground = dark ? colors.white : colors.ink;
  text(slide, "TRAVEL PLAN / GHCP LAB", 0.65, 0.45, 8, 0.3,
    { fontSize: 11, color: dark ? "B6D6CE" : colors.muted, charSpacing: 1.5 });
  text(slide, title, 0.65, 1.05, 11.8, 0.65, { fontSize: 32, bold: true, color: foreground });
  text(slide, "교육용 초안 · 승인 문서 아님", 0.65, 6.56, 11.2, 0.28,
    { fontSize: 12, color: dark ? "D5E6DE" : colors.muted });
  text(slide, "PPTX-TRAVEL-REPORT-V1", 0.65, 7.01, 10.5, 0.18,
    { fontSize: 9, color: dark ? "B6D6CE" : colors.muted });
  text(slide, `${number} / 3`, 11.8, 7.0, 0.8, 0.2,
    { fontSize: 10, align: "right", color: dark ? "B6D6CE" : colors.muted });
  return slide;
}

function card(slide, label, value, x, y, w, h, options = {}) {
  slide.addShape(pptx.ShapeType.rect, { x, y, w, h,
    fill: { color: colors.white }, line: { color: colors.white, transparency: 100 } });
  text(slide, label, x + 0.24, y + 0.18, w - 0.48, 0.28,
    { fontSize: 12, color: colors.muted, bold: true });
  text(slide, value, x + 0.24, y + 0.6, w - 0.48, h - 0.78, options);
}

const overview = base("출장 개요", 1, true);
overview.addShape(pptx.ShapeType.ellipse, { x: 10.1, y: 2.55, w: 1.7, h: 1.7,
  fill: { color: colors.teal }, line: { transparency: 100, color: colors.teal } });
overview.addShape(pptx.ShapeType.chevron, { x: 10.63, y: 3.02, w: 0.68, h: 0.76,
  fill: { color: colors.accent }, line: { transparency: 100, color: colors.accent } });
card(overview, "목적지", "{{DESTINATION}}", 0.65, 2.16, 4.2, 1.32, { fontSize: 23, bold: true });
card(overview, "기간", "{{START_DATE}} ~ {{END_DATE}}", 5.2, 2.16, 4.15, 1.32, { fontSize: 15 });
card(overview, "출장 목적", "{{PURPOSE}}", 0.65, 3.84, 8.7, 1.62, { fontSize: 20 });
text(overview, "국내 1인 출장 / 계획 수립과 사전 검토", 0.65, 5.82, 11.8, 0.3,
  { fontSize: 14, color: "D5E6DE" });

const schedule = base("일정과 준비 사항", 2);
schedule.addShape(pptx.ShapeType.rect, { x: 0.65, y: 2.15, w: 0.08, h: 3.65,
  fill: { color: colors.teal }, line: { transparency: 100, color: colors.teal } });
card(schedule, "일정 · 실제 확인된 내용만 기입", "{{SCHEDULE}}", 1.05, 2.15, 5.4, 3.65,
  { fontSize: 16, valign: "top" });
card(schedule, "준비 체크리스트", "{{CHECKLIST}}", 6.85, 2.15, 5.8, 3.65,
  { fontSize: 16, valign: "top" });

const budget = base("예상 경비와 사전 검토", 3);
card(budget, "예상 총액 (KRW)", "{{ESTIMATED_TOTAL}}", 0.65, 2.1, 3.5, 1.4,
  { fontSize: 19, bold: true, color: colors.teal });
card(budget, "숙박 한도 초과 총액 (KRW)", "{{EXCESS_TOTAL}}", 4.5, 2.1, 3.55, 1.4,
  { fontSize: 25, bold: true, color: colors.ink });
card(budget, "숙박 기준 검토 · 승인 여부 아님", "{{REVIEW_RESULT}}", 8.4, 2.1, 4.25, 1.4,
  { fontSize: 15, bold: true });
card(budget, "비용 내역 (KRW)", "{{COST_BREAKDOWN}}", 0.65, 3.85, 5.7, 1.85,
  { fontSize: 15, valign: "top" });
card(budget, "별도 확인 사항", "{{OPEN_ITEMS}}", 6.75, 3.85, 5.9, 1.85,
  { fontSize: 15, valign: "top" });
text(budget, "근거: {{SOURCES}}", 0.65, 5.96, 12, 0.32, { fontSize: 11, color: colors.muted });

pptx.writeFile({ fileName: path.join(__dirname, "trip-plan-report", "assets", "trip-plan-template.pptx") })
  .then(() => console.log("Generated three-slide trip-plan-template.pptx"))
  .catch(error => { console.error(error); process.exitCode = 1; });
