import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
    size?: 'sm' | 'md' | 'lg'
    className?: string
    showText?: boolean
}

const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10"
}

const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
}

export function Logo({ size = 'md', className, showText = true }: LogoProps) {
    return (
        <Link
            href="/listings"
            className={cn(
                "flex items-center space-x-2 transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md",
                className
            )}
            aria-label="CorpsMart - Go to marketplace"
        >
            <Image
                src="/market_square.svg"
                alt="CorpsMart Logo"
                width={size === 'sm' ? 24 : size === 'md' ? 32 : 40}
                height={size === 'sm' ? 24 : size === 'md' ? 32 : 40}
                className={cn(sizeClasses[size], "flex-shrink-0")}
                priority
            />
            {showText && (
                <span className={cn(
                    "font-gloock font-bold text-primary",
                    textSizeClasses[size]
                )}>
                    CorpsMart
                </span>
            )}
        </Link>
    )
}
