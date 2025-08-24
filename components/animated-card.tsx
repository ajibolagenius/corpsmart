"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { useFadeInUp } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedCard({ children, className, delay = 0 }: AnimatedCardProps) {
  const ref = useFadeInUp()

  return (
    <Card
      ref={ref}
      className={cn("animate-on-scroll hover-lift transition-all duration-300", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Card>
  )
}
