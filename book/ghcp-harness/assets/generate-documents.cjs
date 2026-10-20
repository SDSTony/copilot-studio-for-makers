const fs = require("node:fs");
const path = require("node:path");
const { Document, Packer, Paragraph, TextRun, HeadingLevel, LevelFormat } = require("docx");

const names = ["domestic-travel-policy", "expense-rules", "travel-checklist"];

async function generate() {
  for (const name of names) {
    const source = fs.readFileSync(path.join(__dirname, "knowledge", `${name}.md`), "utf8");
    const children = source.split(/\r?\n/).filter(line => line.trim()).map(line => {
      const heading = line.startsWith("## ") ? HeadingLevel.HEADING_2 :
        line.startsWith("# ") ? HeadingLevel.HEADING_1 : undefined;
      return new Paragraph({
        ...(heading ? { heading } : {}),
        ...(line.startsWith("- ") ? { numbering: { reference: "bullets", level: 0 } } : {}),
        children: [new TextRun(line.replace(/^#{1,2} |^- /, ""))],
        spacing: { after: 120 },
      });
    });
    const doc = new Document({
      creator: "Copilot Studio for Makers",
      title: name,
      styles: {
        default: { document: { run: { font: "Arial", size: 22 } } },
        paragraphStyles: [
          { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
            run: { font: "Arial", size: 32, bold: true }, paragraph: { outlineLevel: 0 } },
          { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
            run: { font: "Arial", size: 26, bold: true }, paragraph: { outlineLevel: 1 } },
        ],
      },
      numbering: { config: [{
        reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022",
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }],
      }] },
      sections: [{
        properties: { page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 },
        } },
        children,
      }],
    });
    fs.writeFileSync(path.join(__dirname, `${name}.docx`), await Packer.toBuffer(doc));
    console.log(`Generated ${name}.docx`);
  }
}

generate().catch(error => { console.error(error); process.exitCode = 1; });
