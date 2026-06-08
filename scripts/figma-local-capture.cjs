/**
 * One-off Figma html-to-design submit for localhost (Playwright path).
 *
 * Usage:
 *   npx --package=playwright@1.52.0 node scripts/figma-local-capture.cjs <captureId>
 *     → App SRP preset: /app/boats-for-sale + Filters sheet, viewport 420×900
 *
 *   npx --package=playwright@1.52.0 node scripts/figma-local-capture.cjs <captureId> srp-mobile [state]
 *     → Web SRP Mobile Overview: /boats-for-sale?layout=split&figmaPreview={state}
 *     → state: default | filters-open | active-filters | empty | sort-open |
 *              filters-scrolled | save-search-toast | marketing-footer
 *     → viewport 402×874, selector body
 *
 *   npx --package=playwright@1.52.0 node scripts/figma-local-capture.cjs <captureId> <url> [selector] [viewportWxH]
 *     → Custom URL capture (default selector #rightboat-mobile-capture-root, viewport 402×874)
 *
 * Examples:
 *   node scripts/figma-local-capture.cjs abc123
 *   node scripts/figma-local-capture.cjs abc123 srp-mobile filters-open
 *   node scripts/figma-local-capture.cjs abc123 http://localhost:3000/app/boat/rb558443 body 402x874
 */
const { chromium } = require("playwright")

const SRP_MOBILE_STATES = [
  "default",
  "filters-open",
  "active-filters",
  "empty",
  "sort-open",
  "filters-scrolled",
  "save-search-toast",
  "marketing-footer",
]

function parseViewport(spec, fallbackW, fallbackH) {
  if (!spec || typeof spec !== "string") {
    return { width: fallbackW, height: fallbackH }
  }
  const m = /^(\d+)x(\d+)$/i.exec(spec.trim())
  if (!m) {
    return { width: fallbackW, height: fallbackH }
  }
  return { width: Number(m[1]), height: Number(m[2]) }
}

function srpMobileUrl(state) {
  const preview = state === "default" ? "default" : state
  return `http://localhost:3000/boats-for-sale?layout=split&figmaPreview=${encodeURIComponent(preview)}`
}

async function waitForState(page, mode, state) {
  if (mode === "app-srp") {
    await page.getByRole("button", { name: /^Filters$/ }).first().click()
    await page.getByRole("button", { name: /Show \d+ results/ }).waitFor({
      timeout: 20000,
    })
    await page.waitForTimeout(1200)
    return
  }

  if (mode !== "srp-mobile") {
    await page.waitForTimeout(2000)
    return
  }

  await page.waitForTimeout(1800)

  if (state === "filters-open" || state === "filters-scrolled") {
    await page.getByRole("button", { name: /Show \d+ results/ }).waitFor({
      timeout: 20000,
    })
    await page.waitForTimeout(state === "filters-scrolled" ? 800 : 400)
  }

  if (state === "sort-open") {
    await page.waitForTimeout(600)
  }

  if (state === "save-search-toast") {
    await page.waitForTimeout(1200)
  }

  if (state === "marketing-footer") {
    await page.waitForTimeout(1000)
  }
}

async function main() {
  const captureId = process.argv[2]
  if (!captureId) {
    console.error(
      "Usage: node scripts/figma-local-capture.cjs <captureId> [srp-mobile state | url] [selector] [viewportWxH]"
    )
    process.exit(1)
  }

  const endpoint = `https://mcp.figma.com/mcp/capture/${captureId}/submit`
  const urlArg = process.argv[3]
  const fourthArg = process.argv[4]
  const fifthArg = process.argv[5]

  let mode = "custom"
  let target
  let selectorArg = "#rightboat-mobile-capture-root"
  let viewportSpec
  let srpMobileState = "default"

  if (!urlArg) {
    mode = "app-srp"
    target = "http://localhost:3000/app/boats-for-sale"
    viewportSpec = fourthArg
  } else if (urlArg === "srp-mobile") {
    mode = "srp-mobile"
    srpMobileState = fourthArg && SRP_MOBILE_STATES.includes(fourthArg)
      ? fourthArg
      : "default"
    target = srpMobileUrl(srpMobileState)
    selectorArg = "body"
    viewportSpec = fifthArg
  } else {
    target = urlArg
    selectorArg = fourthArg || selectorArg
    viewportSpec = fifthArg
  }

  const { width, height } =
    mode === "app-srp"
      ? parseViewport(viewportSpec, 420, 900)
      : mode === "srp-mobile"
        ? parseViewport(viewportSpec, 402, 874)
        : parseViewport(viewportSpec, 402, 874)

  const browser = await chromium.launch({ headless: true })
  try {
    const page = await browser.newPage({
      viewport: { width, height },
    })
    await page.goto(target, { waitUntil: "domcontentloaded", timeout: 60000 })
    await page.waitForTimeout(2500)
    await waitForState(page, mode, srpMobileState)

    const res = await page.context().request.get(
      "https://mcp.figma.com/mcp/html-to-design/capture.js"
    )
    const scriptText = await res.text()
    await page.evaluate((s) => {
      const el = document.createElement("script")
      el.textContent = s
      document.head.appendChild(el)
    }, scriptText)
    await page.waitForTimeout(800)

    const out = await page.evaluate(
      ({ captureId, endpoint, selector }) =>
        Promise.race([
          window.figma.captureForDesign({
            captureId,
            endpoint,
            selector,
          }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("captureForDesign timeout")), 120000)
          ),
        ]),
      { captureId, endpoint, selector: selectorArg }
    )
    console.log(
      JSON.stringify(
        {
          mode,
          state: mode === "srp-mobile" ? srpMobileState : undefined,
          target,
          viewport: { width, height },
          selector: selectorArg,
          result: out,
        },
        null,
        2
      )
    )
  } finally {
    await browser.close()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
