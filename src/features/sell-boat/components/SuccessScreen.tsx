"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SuccessScreenProps {
  onReset: () => void
}

const SuccessScreen = ({ onReset }: SuccessScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12 space-y-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >
        <CheckCircle2 className="w-20 h-20 mx-auto text-primary" />
      </motion.div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Your Boat Has Been Listed!</h2>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Thank you for your submission. Our marine experts will review your listing and get back to you within 24 hours.
        </p>
      </div>

      <div className="bg-muted rounded-lg p-5 max-w-sm mx-auto text-left space-y-2">
        <h3 className="font-semibold text-foreground">What happens next?</h3>
        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
          <li>We review your boat details</li>
          <li>You receive a free market valuation</li>
          <li>We connect you with qualified buyers</li>
        </ol>
      </div>

      <Button size="lg" onClick={onReset} className="mt-4">
        Back to Home
      </Button>
    </motion.div>
  )
}

export default SuccessScreen
