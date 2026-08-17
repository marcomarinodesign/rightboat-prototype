#!/usr/bin/env node
/**
 * Batch capture SRP mobile states into Figma Mobile Overview frames.
 *
 * Prereqs: dev server on :3000, Figma file open via MCP.
 *
 * Usage:
 *   node scripts/figma-srp-mobile-batch-capture.cjs
 */
const { chromium } = require("playwright")

const STATES = [
  "filters-open",
  "active-filters",
  "empty",
  "sort-open",
  "filters-scrolled",
  "save-search-toast",
  "marketing-footer",
]

function srpMobileUrl(state) {
  return `http://localhost:3000/boats-for-sale?figmaPreview=${encodeURIComponent(state)}`
}

async function waitForState(page, state) {
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

async function captureState(browser, captureId, state) {
  const endpoint = `https://mcp.figma.com/mcp/capture/${captureId}/submit`
  const page = await browser.newPage({ viewport: { width: 402, height: 874 } })
  try {
    await page.goto(srpMobileUrl(state), {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    })
    await page.waitForTimeout(2500)
    await waitForState(page, state)

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
      ({ captureId, endpoint }) =>
        Promise.race([
          window.figma.captureForDesign({
            captureId,
            endpoint,
            selector: "body",
          }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 90000)
          ),
        ]),
      { captureId, endpoint }
    )
    return { state, captureId, ok: true, out }
  } catch (e) {
    return { state, captureId, ok: false, error: String(e) }
  } finally {
    await page.close()
  }
}

async function main() {
  const captureIds = process.argv.slice(2)
  if (captureIds.length !== STATES.length) {
    console.error(
      `Usage: node scripts/figma-srp-mobile-batch-capture.cjs ${STATES.map(() => "<captureId>").join(" ")}`
    )
    process.exit(1)
  }

  const browser = await chromium.launch({ headless: true })
  const results = []
  try {
    for (let i = 0; i < STATES.length; i++) {
      results.push(await captureState(browser, captureIds[i], STATES[i]))
    }
  } finally {
    await browser.close()
  }
  console.log(JSON.stringify(results, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
