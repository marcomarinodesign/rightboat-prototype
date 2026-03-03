"use client"

import { useCallback, useState } from "react"
import { UseFormReturn } from "react-hook-form"
import {
  BoatFormV3Data,
  BOAT_TYPES,
  EXTRAS_OPTIONS,
} from "../types-v3"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, X } from "lucide-react"

interface WizardStep2V3Props {
  form: UseFormReturn<BoatFormV3Data>
  images: File[]
  setImages: (images: File[]) => void
}

const CONDITIONS = ["Excellent", "Good", "Needs work"] as const

export function WizardStep2V3({
  form,
  images,
  setImages,
}: WizardStep2V3Props) {
  const { register, formState: { errors }, setValue, watch } = form
  const boatType = watch("boatType")
  const listedElsewhere = watch("listedElsewhere")
  const condition = watch("condition")
  const extras = watch("extras")
  const [dragActive, setDragActive] = useState(false)

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return
      const newFiles = Array.from(files).filter((f) =>
        f.type.startsWith("image/")
      )
      setImages([...images, ...newFiles].slice(0, 10))
    },
    [images, setImages]
  )

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const toggleExtra = (extra: string) => {
    const current = extras || []
    const updated = current.includes(extra)
      ? current.filter((e) => e !== extra)
      : [...current, extra]
    setValue("extras", updated)
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>
          Photos{" "}
          <span className="text-muted-foreground text-xs">
            (Recommended: at least 1)
          </span>
        </Label>
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragActive(true)
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragActive(false)
            handleFiles(e.dataTransfer.files)
          }}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            dragActive
              ? "border-primary bg-muted"
              : "border-border hover:border-primary/50"
          }`}
          onClick={() => document.getElementById("file-upload-v3")?.click()}
        >
          <input
            id="file-upload-v3"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Drag &amp; drop or click to upload
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            JPG, PNG up to 10 images
          </p>
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-3">
            {images.map((file, idx) => (
              <div
                key={idx}
                className="relative group rounded-lg overflow-hidden aspect-square bg-muted"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Boat photo ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="expectedPrice">
          Expected Price (€){" "}
          <span className="text-muted-foreground text-xs">Optional</span>
        </Label>
        <Input
          id="expectedPrice"
          type="number"
          placeholder="e.g. 120000"
          {...register("expectedPrice")}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="boatType">Boat Type</Label>
        <Select
          value={boatType}
          onValueChange={(v) => setValue("boatType", v, { shouldValidate: true })}
        >
          <SelectTrigger id="boatType">
            <SelectValue placeholder="Select boat type" />
          </SelectTrigger>
          <SelectContent>
            {BOAT_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.boatType && (
          <p className="text-sm text-destructive">{errors.boatType.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="length">Length (ft)</Label>
          <Input
            id="length"
            type="number"
            placeholder="40"
            {...register("length")}
          />
          {errors.length && (
            <p className="text-sm text-destructive">{errors.length.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="e.g. Barcelona, Spain"
            {...register("location")}
          />
          {errors.location && (
            <p className="text-sm text-destructive">{errors.location.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Condition</Label>
        <div className="grid grid-cols-3 gap-2">
          {CONDITIONS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() =>
                setValue("condition", c, { shouldValidate: true })
              }
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                condition === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        {errors.condition && (
          <p className="text-sm text-destructive">
            {errors.condition.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="engineHours">Engine Hours</Label>
          <Input
            id="engineHours"
            type="number"
            placeholder="e.g. 500"
            {...register("engineHours")}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastMaintenanceYear">Last Maintenance</Label>
          <Input
            id="lastMaintenanceYear"
            type="number"
            placeholder="e.g. 2024"
            {...register("lastMaintenanceYear")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Extras</Label>
        <div className="grid grid-cols-2 gap-2">
          {EXTRAS_OPTIONS.map((extra) => (
            <label
              key={extra}
              className="flex items-center gap-2 p-3 rounded-lg border bg-card cursor-pointer hover:bg-muted transition-colors"
            >
              <Checkbox
                checked={extras?.includes(extra)}
                onCheckedChange={() => toggleExtra(extra)}
              />
              <span className="text-sm">{extra}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
        <Label htmlFor="listedElsewhere" className="cursor-pointer">
          Currently listed elsewhere?
        </Label>
        <Switch
          id="listedElsewhere"
          checked={listedElsewhere}
          onCheckedChange={(v) => setValue("listedElsewhere", v)}
        />
      </div>
    </div>
  )
}
