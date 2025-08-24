"use client"

import { useEffect, useRef } from "react"

// Animation utilities for GSAP-like effects using CSS animations and Intersection Observer
export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
        ...options,
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return elementRef
}

export const useFadeInUp = () => {
  return useScrollAnimation()
}

export const useStaggerAnimation = (delay = 100) => {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const children = container.children
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            Array.from(children).forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("animate-in")
              }, index * delay)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [delay])

  return containerRef
}

export const useCountUp = (endValue: number, duration = 2000) => {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let startValue = 0
            const increment = endValue / (duration / 16)

            const counter = setInterval(() => {
              startValue += increment
              if (startValue >= endValue) {
                element.textContent = endValue.toString()
                clearInterval(counter)
              } else {
                element.textContent = Math.floor(startValue).toString()
              }
            }, 16)
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [endValue, duration])

  return elementRef
}
