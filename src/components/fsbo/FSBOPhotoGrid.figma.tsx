// FIGMA FRAME: FSBO / Step 2 — Photos / Desktop (74-26)
// LAST SYNC: 2026-06-15

import figma from "@figma/code-connect/react"

import { FSBOPhotoGrid } from "./FSBOPhotoGrid"
import { figmaPreviewMockPhotos } from "@/lib/fsbo/figma-preview"

figma.connect(
  FSBOPhotoGrid,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=188-1282",
  {
    imports: [
      'import { FSBOPhotoGrid } from "@/components/fsbo/FSBOPhotoGrid"',
      'import { figmaPreviewMockPhotos } from "@/lib/fsbo/figma-preview"',
    ],
    example: () => (
      <FSBOPhotoGrid
        photos={figmaPreviewMockPhotos()}
        onRemove={() => {}}
      />
    ),
  }
)
