/**
 * Design tokens — single source of truth.
 * Prefer Tailwind classes using @theme in globals.css; use these for non-Tailwind contexts (e.g. style prop, third-party).
 */

export const tokens = {
  colors: {
    brand: {
      midnight: "var(--brand-midnight)",
      blue: {
        200: "var(--brand-blue-200)",
        300: "var(--brand-blue-300)",
        400: "var(--brand-blue-400)",
        500: "var(--brand-blue-500)",
        600: "var(--brand-blue-600)",
      },
    },
    semantic: {
      tagBg: "var(--tag-bg)",
      borderCard: "var(--border-card)",
      overlay: "var(--overlay)",
    },
  },
  spacing: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
  },
  radius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
    "2xl": "var(--radius-2xl)",
    full: "9999px",
  },
  shadow: {
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)",
    lg: "var(--shadow-lg)",
  },
  transition: {
    duration: {
      fast: "150ms",
      normal: "200ms",
      slow: "300ms",
    },
    easing: "ease-in-out",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  typography: {
    "heading-xl": "var(--heading-xl)",
    "heading-lg": "var(--heading-lg)",
    "heading-md": "var(--heading-md)",
    "heading-sm": "var(--heading-sm)",
  },
} as const

export type Tokens = typeof tokens
