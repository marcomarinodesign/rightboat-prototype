/**
 * Code Connect — sustituye la URL completa por "Copiar enlace a la selección" del Button en Figma.
 * Luego añade `props` con figma.enum / figma.string alineados a las propiedades del componente en Figma.
 * Guía: docs/CODE_CONNECT.md
 */
import figma from "@figma/code-connect/react"

import { Button } from "./button"

figma.connect(
  Button,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/rightboat-prototype?node-id=1-1",
  {
    imports: ['import { Button } from "@/components/ui/button"'],
    example: () => <Button>Label</Button>,
  }
)
