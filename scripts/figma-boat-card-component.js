/**
 * Plugin API script for Figma MCP `use_figma` — regenerates the "Boat Card" component set.
 * Regenerate payload: node -e "const fs=require('fs');const c=fs.readFileSync('scripts/figma-boat-card-component.js','utf8'); fs.writeFileSync('mcp-args-boat-card.json', JSON.stringify({fileKey:'VOCH4pGubqSYza7CbL30c7',description:'Boat Card',skillNames:'figma-use,figma-generate-design',code:c}));"
 * File key: FIGMA-MCP file (update if your file differs).
 * Context: docs/DESIGN_SOURCE.md
 */
const V = {
  card: "VariableID:11:4",
  borderCard: "VariableID:10:19",
  tagBg: "VariableID:10:18",
  foreground: "VariableID:11:3",
  primary: "VariableID:11:6",
  primaryFg: "VariableID:11:7",
  mutedFg: "VariableID:11:11",
};

async function getVar(id) {
  const v = await figma.variables.getVariableByIdAsync(id);
  if (!v) throw new Error("Missing variable " + id);
  return v;
}

function bindFillColor(variable) {
  return figma.variables.setBoundVariableForPaint(
    { type: "SOLID", color: { r: 1, g: 1, b: 1 } },
    "color",
    variable
  );
}

async function bindNodeFill(node, varId) {
  node.fills = [bindFillColor(await getVar(varId))];
}

async function bindNodeStroke(node, varId, weight) {
  node.strokes = [bindFillColor(await getVar(varId))];
  node.strokeWeight = weight;
}

async function styleTextColor(t, varId) {
  const variable = await getVar(varId);
  if (t.fills[0] && t.fills[0].type === "SOLID") {
    t.fills = [bindFillColor(variable)];
  }
}

function textNode(content, size, weight) {
  const t = figma.createText();
  const style = weight >= 700 ? "Bold" : weight >= 600 ? "Semi Bold" : "Regular";
  t.fontName = { family: "Inter", style: style };
  t.fontSize = size;
  t.characters = content;
  t.lineHeight = { unit: "PIXELS", value: Math.round(size * 1.3) };
  return t;
}

/** Long sample so the component shows single-line ellipsis in the file (matches app `truncate`). */
const SAMPLE_BOAT_TITLE =
  "Sea Ray 320 Sundancer — Twin Merc 350 · Generator · Full electronics";

async function buildDetails(showCta) {
  const col = figma.createFrame();
  col.name = "info";
  col.layoutMode = "VERTICAL";
  col.itemSpacing = 8;
  col.paddingLeft = 8;
  col.paddingRight = 8;
  col.paddingTop = 8;
  col.paddingBottom = 8;
  col.fills = [];

  const title = textNode(SAMPLE_BOAT_TITLE, 16, 700);
  await styleTextColor(title, V.foreground);
  col.appendChild(title);
  title.name = "Boat title";
  title.layoutSizingHorizontal = "FILL";
  title.textAutoResize = "HEIGHT";
  title.textTruncation = "ENDING";
  title.maxLines = 1;

  const priceRow = figma.createFrame();
  priceRow.layoutMode = "HORIZONTAL";
  priceRow.primaryAxisAlignItems = "SPACE_BETWEEN";
  priceRow.counterAxisAlignItems = "CENTER";
  priceRow.itemSpacing = 8;
  priceRow.fills = [];
  const price = textNode("$175,000", 16, 700);
  price.lineHeight = { unit: "PIXELS", value: 24 };
  await styleTextColor(price, V.primary);
  const infoBtn = figma.createFrame();
  infoBtn.resize(20, 20);
  infoBtn.fills = [];
  const infoT = textNode("i", 12, 700);
  await styleTextColor(infoT, V.primary);
  infoBtn.appendChild(infoT);
  infoT.x = 7;
  infoT.y = 2;
  priceRow.appendChild(price);
  priceRow.appendChild(infoBtn);
  col.appendChild(priceRow);
  priceRow.layoutSizingHorizontal = "FILL";

  const meta = figma.createFrame();
  meta.layoutMode = "HORIZONTAL";
  meta.itemSpacing = 4;
  meta.counterAxisAlignItems = "CENTER";
  meta.fills = [];
  const loc = textNode("Miami, FL", 12, 400);
  await styleTextColor(loc, V.mutedFg);
  const sep = figma.createRectangle();
  sep.resize(1, 14);
  sep.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }];
  sep.opacity = 0.4;
  const br = textNode("MarineMax", 12, 400);
  await styleTextColor(br, V.mutedFg);
  meta.appendChild(loc);
  meta.appendChild(sep);
  meta.appendChild(br);
  col.appendChild(meta);
  meta.layoutSizingHorizontal = "FILL";

  const rule = figma.createRectangle();
  rule.resize(100, 1);
  await bindNodeFill(rule, V.borderCard);
  col.appendChild(rule);

  const seller = figma.createFrame();
  seller.layoutMode = "HORIZONTAL";
  seller.itemSpacing = 12;
  seller.counterAxisAlignItems = "CENTER";
  seller.fills = [];

  const logo = figma.createFrame();
  logo.name = "Broker logo";
  logo.resize(96, 36);
  logo.cornerRadius = 6;
  await bindNodeStroke(logo, V.borderCard, 1);
  await bindNodeFill(logo, V.card);
  const logoHint = textNode("Logo", 10, 400);
  await styleTextColor(logoHint, V.mutedFg);
  logo.appendChild(logoHint);
  logoHint.x = 34;
  logoHint.y = 12;
  seller.appendChild(logo);

  if (showCta) {
    const cta = figma.createFrame();
    cta.name = "Contact CTA";
    cta.layoutMode = "HORIZONTAL";
    cta.primaryAxisAlignItems = "CENTER";
    cta.counterAxisAlignItems = "CENTER";
    cta.paddingLeft = 12;
    cta.paddingRight = 12;
    cta.paddingTop = 8;
    cta.paddingBottom = 8;
    cta.cornerRadius = 6;
    await bindNodeFill(cta, V.primary);
    const ctaText = textNode("Contact Seller", 14, 600);
    await styleTextColor(ctaText, V.primaryFg);
    cta.appendChild(ctaText);
    cta.resize(180, 36);
    seller.appendChild(cta);
    cta.layoutSizingHorizontal = "FILL";
    cta.layoutSizingVertical = "FIXED";
  }
  col.appendChild(seller);
  seller.layoutSizingHorizontal = "FILL";

  return { col, title, price, loc, br };
}

async function buildMediaBlock(imgW, imgH) {
  const media = figma.createFrame();
  media.name = "Media";
  media.layoutMode = "VERTICAL";
  media.itemSpacing = 8;
  media.primaryAxisAlignItems = "MIN";
  media.counterAxisAlignItems = "MIN";
  media.clipsContent = true;
  media.cornerRadius = 8;
  media.resize(imgW, imgH + 28);
  media.fills = [];

  const ph = figma.createRectangle();
  ph.name = "Photo";
  ph.resize(imgW, imgH);
  ph.cornerRadius = 8;
  await bindNodeFill(ph, V.mutedFg);
  ph.opacity = 0.12;
  media.appendChild(ph);
  ph.layoutSizingHorizontal = "FILL";
  ph.layoutSizingVertical = "FIXED";

  const tagRow = figma.createFrame();
  tagRow.name = "Tag row";
  tagRow.layoutMode = "HORIZONTAL";
  tagRow.itemSpacing = 6;
  tagRow.fills = [];
  function chip() {
    const f = figma.createFrame();
    f.layoutMode = "HORIZONTAL";
    f.paddingLeft = 8;
    f.paddingRight = 8;
    f.paddingTop = 4;
    f.paddingBottom = 4;
    f.cornerRadius = 6;
    return f;
  }
  const yearChip = chip();
  yearChip.name = "Year chip";
  await bindNodeFill(yearChip, V.tagBg);
  const yearText = textNode("2021", 12, 600);
  await styleTextColor(yearText, V.foreground);
  yearChip.appendChild(yearText);
  const condChip = chip();
  condChip.name = "Condition chip";
  await bindNodeFill(condChip, V.tagBg);
  const condText = textNode("Used", 12, 600);
  await styleTextColor(condText, V.foreground);
  condChip.appendChild(condText);
  tagRow.appendChild(yearChip);
  tagRow.appendChild(condChip);
  media.appendChild(tagRow);
  tagRow.layoutSizingHorizontal = "HUG";

  const dots = figma.createFrame();
  dots.name = "Dots";
  dots.layoutMode = "HORIZONTAL";
  dots.itemSpacing = 4;
  dots.fills = [];
  for (let i = 0; i < 4; i++) {
    const d = figma.createEllipse();
    d.resize(6, 6);
    d.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    d.opacity = i === 0 ? 1 : 0.45;
    dots.appendChild(d);
  }
  media.appendChild(dots);
  dots.layoutSizingHorizontal = "HUG";

  return { media, yearText, condText };
}

await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
await figma.loadFontAsync({ family: "Inter", style: "Bold" });

const page = figma.root.children.find((p) => p.name === "Complex Components");
await figma.setCurrentPageAsync(page);

const old = await figma.getNodeByIdAsync("46:2");
if (old && old.name === "Boat Card") old.name = "Boat Card (archived)";

const imgW = 304;
const imgH = 200;

const compGrid = figma.createComponent();
compGrid.name = "Variant=grid";
compGrid.layoutMode = "VERTICAL";
compGrid.itemSpacing = 0;
compGrid.paddingLeft = 8;
compGrid.paddingRight = 8;
compGrid.paddingTop = 8;
compGrid.paddingBottom = 8;
compGrid.cornerRadius = 16;
await bindNodeFill(compGrid, V.card);
await bindNodeStroke(compGrid, V.borderCard, 1);
compGrid.resize(320, 480);

const mg = await buildMediaBlock(imgW, imgH);
compGrid.appendChild(mg.media);
mg.media.layoutSizingHorizontal = "FILL";
mg.media.layoutSizingVertical = "HUG";

const dg = await buildDetails(true);
compGrid.appendChild(dg.col);
dg.col.layoutSizingHorizontal = "FILL";
dg.col.layoutSizingVertical = "HUG";
const ruleG = dg.col.children.find((n) => n.type === "RECTANGLE" && n.height <= 1.5);
if (ruleG) ruleG.layoutSizingHorizontal = "FILL";

const yk = compGrid.addComponentProperty("Year", "TEXT", "2021");
const ck = compGrid.addComponentProperty("Condition", "TEXT", "Used");
const tk = compGrid.addComponentProperty("Title", "TEXT", SAMPLE_BOAT_TITLE);
const pk = compGrid.addComponentProperty("Price", "TEXT", "$175,000");
const lk = compGrid.addComponentProperty("Location", "TEXT", "Miami, FL");
const bk = compGrid.addComponentProperty("Broker", "TEXT", "MarineMax");
mg.yearText.componentPropertyReferences = { characters: yk };
mg.condText.componentPropertyReferences = { characters: ck };
dg.title.componentPropertyReferences = { characters: tk };
dg.price.componentPropertyReferences = { characters: pk };
dg.loc.componentPropertyReferences = { characters: lk };
dg.br.componentPropertyReferences = { characters: bk };

const compList = figma.createComponent();
compList.name = "Variant=list";
compList.layoutMode = "HORIZONTAL";
compList.itemSpacing = 12;
compList.paddingLeft = 8;
compList.paddingTop = 8;
compList.paddingRight = 8;
compList.paddingBottom = 8;
compList.cornerRadius = 16;
await bindNodeFill(compList, V.card);
await bindNodeStroke(compList, V.borderCard, 1);
compList.resize(680, 280);

const ml = await buildMediaBlock(272, imgH);
compList.appendChild(ml.media);
ml.media.layoutSizingHorizontal = "FIXED";
ml.media.layoutSizingVertical = "HUG";

const dl = await buildDetails(false);
compList.appendChild(dl.col);
dl.col.layoutSizingHorizontal = "FILL";
dl.col.layoutSizingVertical = "HUG";

const yk2 = compList.addComponentProperty("Year", "TEXT", "2021");
const ck2 = compList.addComponentProperty("Condition", "TEXT", "Used");
const tk2 = compList.addComponentProperty("Title", "TEXT", SAMPLE_BOAT_TITLE);
const pk2 = compList.addComponentProperty("Price", "TEXT", "$175,000");
const lk2 = compList.addComponentProperty("Location", "TEXT", "Miami, FL");
const bk2 = compList.addComponentProperty("Broker", "TEXT", "MarineMax");
ml.yearText.componentPropertyReferences = { characters: yk2 };
ml.condText.componentPropertyReferences = { characters: ck2 };
dl.title.componentPropertyReferences = { characters: tk2 };
dl.price.componentPropertyReferences = { characters: pk2 };
dl.loc.componentPropertyReferences = { characters: lk2 };
dl.br.componentPropertyReferences = { characters: bk2 };

const ruleL = dl.col.children.find((n) => n.type === "RECTANGLE" && n.height <= 1.5);
if (ruleL) ruleL.layoutSizingHorizontal = "FILL";

const set = figma.combineAsVariants([compGrid, compList], page);
set.name = "Boat Card";

let maxX = 0;
let maxY = 0;
for (const child of set.children) {
  if (child.name.startsWith("Variant=grid")) {
    child.x = 0;
    child.y = 0;
  } else {
    child.x = 420;
    child.y = 0;
  }
  maxX = Math.max(maxX, child.x + child.width);
  maxY = Math.max(maxY, child.y + child.height);
}
set.resizeWithoutConstraints(maxX + 80, maxY + 80);
set.x = 1124;
set.y = 1718;

return {
  componentSetId: set.id,
  componentSetName: set.name,
  page: page.name,
  archivedPrior: old ? old.name : null,
  createdNodeIds: [set.id],
  mutatedNodeIds: [old ? old.id : null].filter(Boolean),
};
