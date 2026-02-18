"use client"

import { useState } from "react"
import { HeroSection17 } from "@/components/blocks/hero-section-17"
import { FSBOWizardModal } from "@/components/FSBOWizardModal"

export function FSBOHeroWithModal() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <HeroSection17
        badge="For owners & dealers"
        heading="Sell your boat"
        headingHighlight="privately"
        description="Sell your used boat privately, easily, and commission-free on Rightboat. Find out how you can advertise your boat to 2.5 million buyers on Rightboat."
        ctaText="List my boat on Rightboat.com"
        onCtaClick={() => setModalOpen(true)}
        headingId="fsbo-hero-heading"
      />
      <FSBOWizardModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        modalTitle="List your boat"
      />
    </>
  )
}
