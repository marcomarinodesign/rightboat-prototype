#!/usr/bin/env node
/**
 * Batch capture FSBO flow screens into Figma FSBO-Page frames.
 *
 * Prereqs: dev server on :3000, capture IDs from generate_figma_design (one per frame).
 *
 * Usage:
 *   node scripts/figma-fsbo-batch-capture.cjs <captureId1> <captureId2> ... <captureId14>
 */
const { chromium } = require("playwright")

const SCREENS = [
  {
    key: "landing-desktop",
    url: "http://localhost:3000/fsbo?figmaPreview=desktop",
    width: 1440,
    height: 900,
  },
  {
    key: "landing-mobile",
    url: "http://localhost:3000/fsbo?figmaPreview=mobile",
    width: 402,
    height: 874,
  },
  {
    key: "step-1-desktop",
    url: "http://localhost:3000/fsbo/wizard?figmaPreview=step-1&previewMode=desktop",
    width: 1440,
    height: 900,
  },
  {
    key: "step-1-mobile",
    url: "http://localhost:3000/fsbo/wizard?figmaPreview=step-1&previewMode=mobile",
    width: 402,
    height: 874,
  },
  {
    key: "step-2-desktop",
    url: "http://localhost:3000/fsbo/wizard?figmaPreview=step-2&previewMode=desktop",
    width: 1440,
    height: 900,
  },
  {
    key: "step-2-mobile",
    url: "http://localhost:3000/fsbo/wizard?figmaPreview=step-2&previewMode=mobile",
    width: 402,
    height: 874,
  },
  {
    key: "step-3-desktop",
    url: "http://localhost:3000/fsbo/wizard?figmaPreview=step-3&previewMode=desktop",
    width: 1440,
    height: 900,
  },
  {
    key: "step-3-mobile",
    url: "http://localhost:3000/fsbo/wizard?figmaPreview=step-3&previewMode=mobile",
    width: 402,
    height: 874,
  },
  {
    key: "step-4-desktop",
    url: "http://localhost:3000/fsbo/wizard?figmaPreview=step-4&previewMode=desktop",
    width: 1440,
    height: 900,
  },
  {
    key: "step-4-mobile",
    url: "http://localhost:3000/fsbo/wizard?figmaPreview=step-4&previewMode=mobile",
    width: 402,
    height: 874,
  },
  {
    key: "step-5-desktop",
    url: "http://localhost:3000/fsbo/wizard?figmaPreview=step-5&previewMode=desktop",
    width: 1440,
    height: 900,
  },
  {
    key: "step-5-mobile",
    url: "http://localhost:3000/fsbo/wizard?figmaPreview=step-5&previewMode=mobile",
    width: 402,
    height: 874,
  },
  {
    key: "success-desktop",
    url: "http://localhost:3000/fsbo/success-preview",
    width: 1440,
    height: 900,
  },
  {
    key: "success-mobile",
    url: "http://localhost:3000/fsbo/success-preview",
    width: 402,
    height: 874,
  },
]

async function captureScreen(browser, captureId, screen) {
  const endpoint = `https://mcp.figma.com/mcp/capture/${captureId}/submit`
  const page = await browser.newPage({
    viewport: { width: screen.width, height: screen.height },
  })
  try {
    console.error(`[capture] ${screen.key} → ${screen.url}`)
    await page.goto(screen.url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    })
    await page.waitForTimeout(4000)

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
            setTimeout(() => reject(new Error("captureForDesign timeout")), 120000)
          ),
        ]),
      { captureId, endpoint }
    )
    console.error(`[capture] ${screen.key} done`)
    return { ...screen, captureId, ok: true, out }
  } catch (e) {
    console.error(`[capture] ${screen.key} FAILED:`, e)
    return { ...screen, captureId, ok: false, error: String(e) }
  } finally {
    await page.close()
  }
}

async function main() {
  const captureIds = process.argv.slice(2)
  if (captureIds.length !== SCREENS.length) {
    console.error(
      `Expected ${SCREENS.length} capture IDs, got ${captureIds.length}.\n` +
        `Usage: node scripts/figma-fsbo-batch-capture.cjs ${SCREENS.map(() => "<captureId>").join(" ")}`
    )
    process.exit(1)
  }

  const browser = await chromium.launch({ headless: true })
  const results = []
  try {
    for (let i = 0; i < SCREENS.length; i++) {
      results.push(await captureScreen(browser, captureIds[i], SCREENS[i]))
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
