/**
 * Figma MCP (use_figma): homepage "Boats by Categories" cards — mirrors HomeCategories + categories-extended.
 * File key: VOCH4pGubqSYza7CbL30c7 (update if yours differs).
 * Run via Cursor Figma MCP or: regenerate payload like figma-boat-card-component.js
 */
const FILE_PAGE = "Home — Categories";

const V = {
  card: "VariableID:11:4",
  mutedFg: "VariableID:11:11",
  primary: "VariableID:11:6",
  primaryFg: "VariableID:11:7",
  foreground: "VariableID:11:3",
};

const CATEGORIES = [
  {
    key: "Motorboats",
    title: "Motorboats",
    description: "Powerful and versatile boats for cruising and watersports",
    image:
      "https://www.rightboat.com/boat_images/image_22741276/thumb_592ccc096be94ae688f2f798eb95baefec6e9108b5f34c6181cba1e676823e6e.webp",
  },
  {
    key: "Sailboats",
    title: "Sailboats",
    description: "Classic sailing vessels for the traditional boating enthusiast",
    image:
      "https://www.rightboat.com/boat_images/image_22714358/thumb_a9c8f4fc612c494eadc9f29abc36093613be58406b80496088c4976067dbe181.webp",
  },
  {
    key: "RIBs",
    title: "RIBs",
    description: "Rigid inflatable boats perfect for adventure and safety",
    image:
      "https://www.rightboat.com/boat_images/image_22499848/thumb_736c623ab056424a8ee8ab9f08b213278be2f1bff5584325a8494422a6bcffb0.webp",
  },
  {
    key: "Yachts",
    title: "Yachts",
    description: "Luxury vessels for the ultimate boating experience",
    image:
      "https://www.rightboat.com/boat_images/image_22772985/thumb_8a238693cc4a44599841019d3902ec653d78cab154af4d989db48ba448495701.webp",
  },
  {
    key: "Catamarans",
    title: "Catamarans",
    description: "Stable multi-hull boats ideal for comfort and space",
    image:
      "https://www.rightboat.com/boat_images/image_24403046/3267a932434742d9b76334f6c3d2422aa541b5c487484d9d854c181311f4482d.webp",
  },
  {
    key: "Fishing Boats",
    title: "Fishing Boats",
    description: "Specialized vessels designed for angling and fishing",
    image:
      "https://www.rightboat.com/boat_images/image_24894677/1b9ee4fce58c439aa2dfc4de16dc838a783ecad71a0b4c0fb6a30576d4ffd949.webp",
  },
];

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

async function styleTextVar(t, varId) {
  const variable = await getVar(varId);
  if (t.fills[0] && t.fills[0].type === "SOLID") {
    t.fills = [bindFillColor(variable)];
  }
}

async function loadFonts() {
  const tryGeist = async () => {
    await figma.loadFontAsync({ family: "Geist", style: "Bold" });
    await figma.loadFontAsync({ family: "Geist", style: "Medium" });
    await figma.loadFontAsync({ family: "Geist", style: "Regular" });
    return {
      bold: { family: "Geist", style: "Bold" },
      medium: { family: "Geist", style: "Medium" },
      regular: { family: "Geist", style: "Regular" },
    };
  };
  const tryInter = async () => {
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    return {
      bold: { family: "Inter", style: "Bold" },
      medium: { family: "Inter", style: "Semi Bold" },
      regular: { family: "Inter", style: "Regular" },
    };
  };
  try {
    return await tryGeist();
  } catch {
    return await tryInter();
  }
}

async function setImageFill(rect, url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(String(res.status));
    const buf = await res.arrayBuffer();
    const hash = figma.createImage(new Uint8Array(buf)).hash;
    rect.fills = [
      {
        type: "IMAGE",
        imageHash: hash,
        scaleMode: "FILL",
      },
    ];
    return true;
  } catch {
    await bindNodeFill(rect, V.mutedFg);
    rect.opacity = 0.35;
    return false;
  }
}

function gradientOverlay() {
  return {
    type: "GRADIENT_LINEAR",
    gradientStops: [
      { position: 0, color: { r: 0, g: 0, b: 0, a: 0.4 } },
      { position: 0.45, color: { r: 0, g: 0, b: 0, a: 0.3 } },
      { position: 1, color: { r: 0, g: 0, b: 0, a: 0.6 } },
    ],
    gradientTransform: [
      [0, 1, 0],
      [-1, 0, 1],
    ],
  };
}

async function buildCategoryVariant(cat, fonts) {
  const W = 280;
  const H = 210;

  const comp = figma.createComponent();
  comp.name = `Category=${cat.key}`;
  comp.layoutMode = "NONE";
  comp.resize(W, H);
  comp.clipsContent = true;
  comp.cornerRadius = 8;

  const photo = figma.createRectangle();
  photo.name = "Photo";
  photo.resize(W, H);
  photo.x = 0;
  photo.y = 0;
  await setImageFill(photo, cat.image);
  comp.appendChild(photo);

  const scrim = figma.createRectangle();
  scrim.name = "Scrim";
  scrim.resize(W, H);
  scrim.x = 0;
  scrim.y = 0;
  scrim.fills = [gradientOverlay()];
  comp.appendChild(scrim);

  const content = figma.createFrame();
  content.name = "Content";
  content.layoutMode = "VERTICAL";
  content.primaryAxisAlignItems = "SPACE_BETWEEN";
  content.counterAxisAlignItems = "CENTER";
  content.paddingLeft = 24;
  content.paddingRight = 24;
  content.paddingTop = 24;
  content.paddingBottom = 24;
  content.itemSpacing = 0;
  content.fills = [];
  content.x = 0;
  content.y = 0;
  content.resize(W, H);

  const title = figma.createText();
  title.fontName = fonts.bold;
  title.fontSize = 20;
  title.lineHeight = { unit: "PIXELS", value: 28 };
  title.textAlignHorizontal = "CENTER";
  title.characters = cat.title;
  title.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];

  const bottom = figma.createFrame();
  bottom.name = "Bottom";
  bottom.layoutMode = "VERTICAL";
  bottom.itemSpacing = 16;
  bottom.counterAxisAlignItems = "CENTER";
  bottom.fills = [];

  const btn = figma.createFrame();
  btn.name = "Discover";
  btn.layoutMode = "HORIZONTAL";
  btn.primaryAxisAlignItems = "CENTER";
  btn.counterAxisAlignItems = "CENTER";
  btn.paddingLeft = 16;
  btn.paddingRight = 16;
  btn.paddingTop = 8;
  btn.paddingBottom = 8;
  btn.cornerRadius = 6;
  await bindNodeFill(btn, V.primary);

  const btnLabel = figma.createText();
  btnLabel.fontName = fonts.medium;
  btnLabel.fontSize = 14;
  btnLabel.lineHeight = { unit: "PIXELS", value: 20 };
  btnLabel.characters = "Discover";
  await styleTextVar(btnLabel, V.primaryFg);
  btn.appendChild(btnLabel);

  const desc = figma.createText();
  desc.fontName = fonts.regular;
  desc.fontSize = 14;
  desc.lineHeight = { unit: "PIXELS", value: 20 };
  desc.textAlignHorizontal = "CENTER";
  desc.characters = cat.description;
  desc.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  desc.opacity = 0.9;

  bottom.appendChild(btn);
  bottom.appendChild(desc);

  content.appendChild(title);
  content.appendChild(bottom);
  comp.appendChild(content);

  title.layoutSizingHorizontal = "FILL";
  desc.layoutSizingHorizontal = "FILL";

  const tk = comp.addComponentProperty("Title", "TEXT", cat.title);
  const dk = comp.addComponentProperty("Description", "TEXT", cat.description);
  title.componentPropertyReferences = { characters: tk };
  desc.componentPropertyReferences = { characters: dk };

  return comp;
}

const fonts = await loadFonts();

let page = figma.root.children.find((p) => p.name === FILE_PAGE);
if (!page) {
  page = figma.createPage();
  page.name = FILE_PAGE;
}
await figma.setCurrentPageAsync(page);

let section = page.findOne(
  (n) => n.type === "FRAME" && n.name === "Section — Boats by Categories"
);

if (!section) {
  let maxX = 0;
  for (const c of page.children) {
    maxX = Math.max(maxX, c.x + c.width);
  }
  const ORIGIN_X = maxX > 0 ? maxX + 80 : 80;
  const ORIGIN_Y = 80;

  section = figma.createFrame();
  section.name = "Section — Boats by Categories";
  section.layoutMode = "VERTICAL";
  section.itemSpacing = 32;
  section.fills = [];
  section.x = ORIGIN_X;
  section.y = ORIGIN_Y;
  section.resize(1200, 800);

  const headerRow = figma.createFrame();
  headerRow.name = "Header row";
  headerRow.layoutMode = "HORIZONTAL";
  headerRow.primaryAxisAlignItems = "SPACE_BETWEEN";
  headerRow.counterAxisAlignItems = "MAX";
  headerRow.itemSpacing = 24;
  headerRow.fills = [];

  const headerLeft = figma.createFrame();
  headerLeft.layoutMode = "VERTICAL";
  headerLeft.itemSpacing = 8;
  headerLeft.fills = [];

  const h2 = figma.createText();
  h2.fontName = fonts.bold;
  h2.fontSize = 24;
  h2.lineHeight = { unit: "PIXELS", value: 32 };
  h2.characters = "Boats by Categories";
  await styleTextVar(h2, V.foreground);
  headerLeft.appendChild(h2);

  const sub = figma.createText();
  sub.fontName = fonts.regular;
  sub.fontSize = 16;
  sub.lineHeight = { unit: "PIXELS", value: 24 };
  sub.characters =
    "Explore boats by type and find the perfect vessel for your needs";
  await styleTextVar(sub, V.mutedFg);
  headerLeft.appendChild(sub);

  const seeAll = figma.createText();
  seeAll.fontName = fonts.regular;
  seeAll.fontSize = 14;
  seeAll.lineHeight = { unit: "PIXELS", value: 20 };
  seeAll.characters = "See all";
  await styleTextVar(seeAll, V.primary);

  headerRow.appendChild(headerLeft);
  headerRow.appendChild(seeAll);
  headerLeft.layoutSizingHorizontal = "FILL";
  seeAll.layoutSizingHorizontal = "HUG";

  page.appendChild(section);
  section.appendChild(headerRow);
  headerRow.layoutSizingHorizontal = "FILL";
} else {
  const removeList = [];
  for (const ch of section.children) {
    if (ch.name === "Reference — instances (carousel strip)") removeList.push(ch);
    if (
      ch.type === "COMPONENT_SET" &&
      /^Home \/ Category card/.test(ch.name)
    ) {
      removeList.push(ch);
    }
  }
  for (const n of removeList) n.remove();
}

const variants = [];
for (const cat of CATEGORIES) {
  variants.push(await buildCategoryVariant(cat, fonts));
}

const set = figma.combineAsVariants(variants, section);
set.name = "Home / Category card";
set.description =
  "Homepage category tiles (HomeCategories). Edit Title & Description via component properties; swap Photo image per variant in the master.";

let vx = 0;
for (const ch of set.children) {
  ch.x = vx;
  ch.y = 0;
  vx += ch.width + 24;
}
set.resizeWithoutConstraints(vx + 40, 260);

const row = figma.createFrame();
row.name = "Reference — instances (carousel strip)";
row.layoutMode = "HORIZONTAL";
row.itemSpacing = 24;
row.fills = [];
row.paddingTop = 8;
row.paddingBottom = 8;

for (const ch of set.children) {
  if (ch.type !== "COMPONENT") continue;
  const inst = ch.createInstance();
  row.appendChild(inst);
  // Instances are not "auto-layout frames"; HUG on layoutSizing throws in use_figma.
}

section.appendChild(row);
row.layoutSizingHorizontal = "HUG";
row.layoutSizingVertical = "HUG";

const createdNodeIds = [section.id, set.id, row.id];
return {
  page: page.name,
  componentSetId: set.id,
  componentSetName: set.name,
  variantCount: variants.length,
  createdNodeIds,
  mutatedNodeIds: [],
};
