"use client"

import { UseFormReturn } from "react-hook-form"
import { BoatFormData, BOAT_TYPES } from "../types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Anchor } from "lucide-react"

interface StepOneProps {
  form: UseFormReturn<BoatFormData>
}

const StepOne = ({ form }: StepOneProps) => {
  const { register, formState: { errors }, setValue, watch } = form
  const boatType = watch("boatType")
  const listedElsewhere = watch("listedElsewhere")

  return (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-3">
          <Anchor className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Sell Your Boat</h2>
        <p className="text-muted-foreground mt-1">Takes less than 2 minutes.</p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="boatType">Boat Type</Label>
        <Select value={boatType} onValueChange={(v) => setValue("boatType", v, { shouldValidate: true })}>
          <SelectTrigger id="boatType">
            <SelectValue placeholder="Select boat type" />
          </SelectTrigger>
          <SelectContent>
            {BOAT_TYPES.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.boatType && <p className="text-sm text-destructive">{errors.boatType.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="brand">Brand</Label>
          <Input id="brand" placeholder="e.g. Beneteau" {...register("brand")} />
          {errors.brand && <p className="text-sm text-destructive">{errors.brand.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="model">Model</Label>
          <Input id="model" placeholder="e.g. Oceanis 40" {...register("model")} />
          {errors.model && <p className="text-sm text-destructive">{errors.model.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="year">Year</Label>
          <Input id="year" type="number" placeholder="2020" {...register("year")} />
          {errors.year && <p className="text-sm text-destructive">{errors.year.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="length">Length (ft)</Label>
          <Input id="length" type="number" placeholder="40" {...register("length")} />
          {errors.length && <p className="text-sm text-destructive">{errors.length.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="location">Location</Label>
        <Input id="location" placeholder="e.g. Barcelona, Spain" {...register("location")} />
        {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
      </div>

      <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
        <Label htmlFor="listedElsewhere" className="cursor-pointer">Currently listed elsewhere?</Label>
        <Switch
          id="listedElsewhere"
          checked={listedElsewhere}
          onCheckedChange={(v) => setValue("listedElsewhere", v)}
        />
      </div>
    </div>
  )
}

export default StepOne
