"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getDefaultAvatar } from "@/lib/default-images"

interface SafeAvatarProps {
    src?: string | null
    name: string
    className?: string
    size?: number
}

/**
 * SafeAvatar component that provides consistent avatar fallback handling
 * Shows user initials as fallback when avatar image is not available
 */
export function SafeAvatar({ src, name, className, size = 40 }: SafeAvatarProps) {
    const initials = name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

    return (
        <Avatar className={className}>
            <AvatarImage
                src={src || getDefaultAvatar(name, size)}
                alt={name}
            />
            <AvatarFallback>
                {initials}
            </AvatarFallback>
        </Avatar>
    )
}
