/**
 * Design tokens — single source of truth.
 * Prefer Tailwind classes from @theme in globals.css; use these for non-Tailwind contexts (e.g. style prop, charts).
 *
 * Names mirror Figma Colors: Blue/*, Malibu/*, Neutral/*, Midnight, Status/*.
 */

export const tokens = {
  colors: {
    midnight: "var(--midnight)",
    blue: {
      200: "var(--blue-200)",
      300: "var(--blue-300)",
      400: "var(--blue-400)",
      500: "var(--blue-500)",
      600: "var(--blue-600)",
    },
    malibu: {
      200: "var(--malibu-200)",
      300: "var(--malibu-300)",
      400: "var(--malibu-400)",
      500: "var(--malibu-500)",
      600: "var(--malibu-600)",
    },
    neutral: {
      white: "var(--neutral-white)",
      black: "var(--neutral-black)",
      50: "var(--neutral-50)",
      100: "var(--neutral-100)",
      200: "var(--neutral-200)",
      300: "var(--neutral-300)",
      400: "var(--neutral-400)",
      500: "var(--neutral-500)",
      600: "var(--neutral-600)",
    },
    status: {
      success: {
        100: "var(--status-success-100)",
        200: "var(--status-success-200)",
        300: "var(--status-success-300)",
      },
      warning: {
        100: "var(--status-warning-100)",
        200: "var(--status-warning-200)",
        300: "var(--status-warning-300)",
      },
      error: {
        100: "var(--status-error-100)",
        200: "var(--status-error-200)",
        300: "var(--status-error-300)",
      },
      info: {
        100: "var(--status-info-100)",
        200: "var(--status-info-200)",
        300: "var(--status-info-300)",
      },
    },
    semantic: {
      tagBg: "var(--tag-bg)",
      borderCard: "var(--border-card)",
      overlay: "var(--overlay)",
      overlaySheet: "var(--overlay-sheet)",
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
