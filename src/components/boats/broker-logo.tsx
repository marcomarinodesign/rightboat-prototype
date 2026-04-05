"use client"

import Image from "next/image"
import { useState } from "react"

import {
  BROKER_LOGO_PLACEHOLDER,
  getBrokerLogoUrl,
} from "@/data/broker-logos"

type BrokerLogoProps = {
  broker: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export function BrokerLogo({
  broker,
  alt,
  width = 28,
  height = 28,
  className,
}: BrokerLogoProps) {
  const initial = getBrokerLogoUrl(broker) ?? BROKER_LOGO_PLACEHOLDER
  const [src, setSrc] = useState(initial)

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      unoptimized={src.startsWith("http")}
      onError={() => setSrc(BROKER_LOGO_PLACEHOLDER)}
    />
  )
}
