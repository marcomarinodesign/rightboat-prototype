// Deterministic full-page captures for pixel-perfect comparison against Figma.
// Usage: node scripts/pixel-capture.mjs <url> <outPrefix> [widths...]
// Widths default to 1440 834 402 (El Captain DS breakpoints).
import { chromium } from "playwright"

const [, , url = "http://localhost:3000", outPrefix = "capture", ...widthArgs] = process.argv
const widths = widthArgs.length ? widthArgs.map(Number) : [1440, 834, 402]

const browser = await chromium.launch()
for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: 950 },
    reducedMotion: "reduce",
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()
  await page.goto(url, { waitUntil: "networkidle" })
  // Trigger whileInView animations by walking the page, then normalize.
  await page.evaluate(async () => {
    const step = window.innerHeight / 2
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 300))
    document.querySelectorAll("*").forEach((el) => {
      const s = getComputedStyle(el)
      if (parseFloat(s.opacity) < 1) {
        el.style.opacity = "1"
        el.style.transform = "none"
      }
    })
  })
  await page.waitForTimeout(400)
  const file = `${outPrefix}-${width}.png`
  await page.screenshot({ path: file, fullPage: true })
  console.log(`${file} ${width}x${await page.evaluate(() => document.body.scrollHeight)}`)
  await context.close()
}
await browser.close()
