"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"
import { DEFAULT_IMAGES, getDefaultListingImage } from "@/lib/default-images"

interface SafeImageProps extends Omit<ImageProps, 'src' | 'onError'> {
    src: string | null | undefined
    fallback?: string
    category?: string
    size?: 'small' | 'medium' | 'large' | 'xlarge'
}

/**
 * SafeImage component that provides consistent fallback handling
 * Automatically falls back to appropriate default images when the source fails to load
 */
export function SafeImage({
    src,
    fallback,
    category,
    size = 'medium',
    alt,
    ...props
}: SafeImageProps) {
    const [hasError, setHasError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Determine the fallback image
    const getFallbackSrc = () => {
        if (fallback) return fallback
        if (category) return getDefaultListingImage(category, size)
        return DEFAULT_IMAGES.listing[size]
    }

    // Use fallback if no src provided or if there was an error
    const imageSrc = (!src || hasError) ? getFallbackSrc() : src

    return (
        <Image
            {...props}
            src={imageSrc}
            alt={alt}
            onLoad={() => setIsLoading(false)}
            onError={() => {
                setHasError(true)
                setIsLoading(false)
            }}
        />
    )
}
