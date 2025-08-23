"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, X, Camera, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const categories = [
  "Electronics",
  "Fashion",
  "Books & Education",
  "Furniture",
  "Sports & Fitness",
  "Beauty & Health",
  "Kitchen & Home",
  "Others",
]

const conditions = ["Brand New", "Excellent", "Very Good", "Good", "Fair"]

const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
]

export default function CreateListingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    state: "",
    lga: "",
    images: [] as string[],
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In a real app, you'd upload to a service like Supabase Storage
      // For now, we'll just create placeholder URLs
      const newImages = Array.from(files).map(
        (file, index) => `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(file.name)}`,
      )
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 5), // Max 5 images
      }))
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement listing creation logic
    console.log("Creating listing:", formData)
    router.push("/listings")
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.description && formData.category
      case 2:
        return formData.price && formData.condition && formData.images.length > 0
      case 3:
        return formData.state && formData.lga
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="px-4 py-4 mx-auto max-w-2xl">
          <div className="flex items-center gap-4">
            <Link href="/listings">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-serif font-bold">List Your Item</h1>
              <p className="text-sm text-muted-foreground">Step {currentStep} of 3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-4 mx-auto max-w-2xl">
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div className={`flex-1 h-1 mx-2 rounded ${step < currentStep ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Item Details</span>
          <span>Price & Photos</span>
          <span>Location</span>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 pb-8 mx-auto max-w-2xl">
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-serif">
              {currentStep === 1 && "Tell us about your item"}
              {currentStep === 2 && "Set your price and add photos"}
              {currentStep === 3 && "Where are you located?"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Provide clear details to attract buyers"}
              {currentStep === 2 && "Good photos and fair pricing help sell faster"}
              {currentStep === 3 && "Help buyers find you easily"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Item Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Item Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., iPhone 13 Pro Max - Excellent Condition"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your item in detail. Include condition, age, reason for selling, etc."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Be honest about the condition to build trust with buyers
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Price & Photos */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₦) *</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="50000"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition *</Label>
                      <Select onValueChange={(value) => handleInputChange("condition", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {conditions.map((condition) => (
                            <SelectItem key={condition} value={condition}>
                              {condition}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Photos * (Max 5)</Label>

                    {/* Image Upload */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 w-6 h-6 p-0"
                            onClick={() => removeImage(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}

                      {formData.images.length < 5 && (
                        <label className="aspect-square bg-muted rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                          <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground text-center">Add Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Add clear, well-lit photos from different angles. First photo will be the main image.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Location */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-4 bg-primary/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Location helps buyers find you</p>
                      <p className="text-xs text-muted-foreground">
                        We only show your general area, not your exact address
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State of Service *</Label>
                      <Select onValueChange={(value) => handleInputChange("state", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {nigerianStates.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lga">LGA *</Label>
                      <Input
                        id="lga"
                        placeholder="e.g., Ikeja"
                        value={formData.lga}
                        onChange={(e) => handleInputChange("lga", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                  Previous
                </Button>

                {currentStep < 3 ? (
                  <Button type="button" onClick={nextStep} disabled={!isStepValid()}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={!isStepValid()} className="min-w-[100px]">
                    List Item
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
