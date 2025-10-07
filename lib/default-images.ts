// Default image utilities for consistent fallback handling across the application

export const DEFAULT_IMAGES = {
    // User avatar fallback
    avatar: "data:image/svg+xml,%3csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='40' height='40' fill='%23e5e7eb'/%3e%3ctext x='20' y='25' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='16'%3e👤%3c/text%3e%3c/svg%3e",

    // Listing image fallbacks
    listing: {
        small: "data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='60' height='60' fill='%23f3f4f6'/%3e%3crect x='15' y='15' width='30' height='30' fill='%23d1d5db'/%3e%3ctext x='30' y='35' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='10'%3e📦%3c/text%3e%3c/svg%3e",
        medium: "data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23f3f4f6'/%3e%3crect x='25' y='25' width='50' height='50' fill='%23d1d5db'/%3e%3ctext x='50' y='55' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='16'%3e📦%3c/text%3e%3c/svg%3e",
        large: "data:image/svg+xml,%3csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='400' height='300' fill='%23f3f4f6'/%3e%3crect x='150' y='100' width='100' height='100' fill='%23d1d5db'/%3e%3ctext x='200' y='155' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='20'%3e📦%3c/text%3e%3c/svg%3e",
        xlarge: "data:image/svg+xml,%3csvg width='600' height='400' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='600' height='400' fill='%23f3f4f6'/%3e%3crect x='225' y='150' width='150' height='100' fill='%23d1d5db'/%3e%3ctext x='300' y='205' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='24'%3e📦%3c/text%3e%3c/svg%3e",
    },

    // Category-specific fallbacks
    category: {
        electronics: "data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='60' height='60' fill='%23f3f4f6'/%3e%3crect x='15' y='15' width='30' height='30' fill='%23d1d5db'/%3e%3ctext x='30' y='35' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='10'%3e📱%3c/text%3e%3c/svg%3e",
        fashion: "data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='60' height='60' fill='%23f3f4f6'/%3e%3crect x='15' y='15' width='30' height='30' fill='%23d1d5db'/%3e%3ctext x='30' y='35' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='10'%3e👕%3c/text%3e%3c/svg%3e",
        books: "data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='60' height='60' fill='%23f3f4f6'/%3e%3crect x='15' y='15' width='30' height='30' fill='%23d1d5db'/%3e%3ctext x='30' y='35' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='10'%3e📚%3c/text%3e%3c/svg%3e",
        furniture: "data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='60' height='60' fill='%23f3f4f6'/%3e%3crect x='15' y='15' width='30' height='30' fill='%23d1d5db'/%3e%3ctext x='30' y='35' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='10'%3e🪑%3c/text%3e%3c/svg%3e",
        other: "data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='60' height='60' fill='%23f3f4f6'/%3e%3crect x='15' y='15' width='30' height='30' fill='%23d1d5db'/%3e%3ctext x='30' y='35' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='10'%3e📦%3c/text%3e%3c/svg%3e",
    }
} as const

/**
 * Get a default avatar image with user initials
 * @param name - User's full name
 * @param size - Size of the avatar (default: 40)
 * @returns Data URL for the avatar image
 */
export function getDefaultAvatar(name: string, size: number = 40): string {
    const initials = name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

    return `data:image/svg+xml,%3csvg width='${size}' height='${size}' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='${size}' height='${size}' fill='%23e5e7eb'/%3e%3ctext x='${size / 2}' y='${size / 2 + 6}' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='${Math.floor(size / 2.5)}'%3e${initials}%3c/text%3e%3c/svg%3e`
}

/**
 * Get a default listing image based on category
 * @param category - Listing category
 * @param size - Size variant ('small', 'medium', 'large', 'xlarge')
 * @returns Data URL for the listing image
 */
export function getDefaultListingImage(category?: string, size: 'small' | 'medium' | 'large' | 'xlarge' = 'medium'): string {
    const categoryKey = category?.toLowerCase() as keyof typeof DEFAULT_IMAGES.category

    if (categoryKey && DEFAULT_IMAGES.category[categoryKey]) {
        return DEFAULT_IMAGES.category[categoryKey]
    }

    return DEFAULT_IMAGES.listing[size]
}

/**
 * Get a safe image source with fallback
 * @param src - Original image source
 * @param fallback - Fallback image source
 * @returns The original source or fallback if original is empty/null
 */
export function getSafeImageSrc(src: string | null | undefined, fallback: string): string {
    return src && src.trim() !== '' ? src : fallback
}
