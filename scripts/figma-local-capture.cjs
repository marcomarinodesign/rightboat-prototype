/**
 * One-off Figma html-to-design submit for localhost (Playwright path).
 *
 * Usage:
 *   npx --package=playwright@1.52.0 node scripts/figma-local-capture.cjs <captureId>
 *     → SRP preset: /app/boats-for-sale + Filters sheet flow, viewport 420×900
 *
 *   npx --package=playwright@1.52.0 node scripts/figma-local-capture.cjs <captureId> <url> [selector] [viewportWxH]
 *     → Open <url>, wait, capture (default selector #rightboat-mobile-capture-root, viewport 402×874)
 *
 * Examples:
 *   node scripts/figma-local-capture.cjs abc123
 *   node scripts/figma-local-capture.cjs abc123 http://localhost:3000/app/boat/rb558443
 *   node scripts/figma-local-capture.cjs abc123 http://localhost:3000/app/boat/rb558443 body 402x874
 */
const { chromium } = require("playwright")

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

async function main() {
  const captureId = process.argv[2]
  if (!captureId) {
    console.error(
      "Usage: node scripts/figma-local-capture.cjs <captureId> [url] [selector] [viewportWxH]"
    )
    process.exit(1)
  }
  const endpoint = `https://mcp.figma.com/mcp/capture/${captureId}/submit`
  const urlArg = process.argv[3]
  const selectorArg = process.argv[4] || "#rightboat-mobile-capture-root"
  const viewportSpec = process.argv[5]

  const useSrpPreset = !urlArg
  const target =
    urlArg || "http://localhost:3000/app/boats-for-sale"
  const { width, height } = useSrpPreset
    ? parseViewport(viewportSpec, 420, 900)
    : parseViewport(viewportSpec, 402, 874)

  const browser = await chromium.launch({ headless: true })
  try {
    const page = await browser.newPage({
      viewport: { width, height },
    })
    await page.goto(target, { waitUntil: "domcontentloaded", timeout: 60000 })
    await page.waitForTimeout(2500)

    if (useSrpPreset) {
      await page.getByRole("button", { name: /^Filters$/ }).first().click()
      await page.getByRole("button", { name: /Show \d+ results/ }).waitFor({
        timeout: 20000,
      })
      await page.waitForTimeout(1200)
    } else {
      await page.waitForTimeout(2000)
    }

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
        window.figma.captureForDesign({
          captureId,
          endpoint,
          selector,
        }),
      { captureId, endpoint, selector: selectorArg }
    )
    console.log(JSON.stringify(out, null, 2))
  } finally {
    await browser.close()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
