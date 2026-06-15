// FIGMA NODE: Card — El-Captain-DS
// NODE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=32-2
// LAST SYNC: 2026-06-15

import figma from "@figma/code-connect/react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card"

function CardPreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent>Card content</CardContent>
    </Card>
  )
}

figma.connect(
  CardPreview,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=32-2",
  {
    imports: [
      'import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"',
    ],
    example: () => <CardPreview />,
  }
)
