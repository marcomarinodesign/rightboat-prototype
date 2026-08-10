// FIGMA NODE: button_web (component set) — Buttons & Links
// FIGMA FILE: https://www.figma.com/design/gPdFmnx9X4CO10RX4fhE8C/Buttons---Links
// NODE: https://www.figma.com/design/gPdFmnx9X4CO10RX4fhE8C/Buttons---Links?node-id=1-4558
// LAST SYNC: 2026-08-10
//
// Antes apuntaba a El-Captain-DS?node-id=24-2, un component set generado desde el código
// que espejaba los variants de shadcn (Outline/Ghost/Destructive/Link · SM/MD/LG/Icon).
// El componente que mantiene diseño es este. Ver docs/DS_AUDIT.md §1.1 y §5.

import figma from "@figma/code-connect/react"

import { Button } from "./button"

figma.connect(
  Button,
  "https://www.figma.com/design/gPdFmnx9X4CO10RX4fhE8C/Buttons---Links?node-id=1-4558",
  {
    imports: ['import { Button } from "@/components/ui/button"'],
    props: {
      variant: figma.enum("Style", {
        Primary: "primary",
        Secondary: "secondary",
        Tertiary: "tertiary",
      } as const),
      size: figma.enum("Size", {
        Large: "lg",
        Medium: "md",
        Small: "sm",
      } as const),
      block: figma.enum("Block", { True: true } as const),
      loading: figma.enum("State", { Loading: true } as const),
      disabled: figma.enum("State", { Disabled: true } as const),
    },
    example: (props) => (
      <Button
        variant={props.variant}
        size={props.size}
        block={props.block}
        loading={props.loading}
        disabled={props.disabled}
      >
        Button
      </Button>
    ),
  }
)
