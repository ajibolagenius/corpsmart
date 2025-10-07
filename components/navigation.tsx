"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Search, MessageCircle, Plus, LogOut, Shield, Receipt } from "lucide-react"
import { getCurrentUser, logout } from "@/lib/mock-users"
import { Logo } from "@/components/logo"

export function Navigation() {
    const [user, setUser] = useState<any>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const currentUser = getCurrentUser()
        setUser(currentUser)
    }, [])

    const handleLogout = () => {
        logout()
        setUser(null)
        window.location.href = "/"
    }

    if (!user) return null

    const navItems = [
        { href: "/listings", label: "Browse", icon: Home },
        { href: "/search", label: "Search", icon: Search },
        { href: "/chat", label: "Chat", icon: MessageCircle },
        { href: "/listings/create", label: "Sell", icon: Plus },
    ]

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-between p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-50">
                <div className="flex items-center space-x-6">
                    <Logo size="md" />
                    <div className="flex items-center space-x-4">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>
                                        {user.name
                                            .split(" ")
                                            .map((n: string) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                {user.isVerified && (
                                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 bg-green-500">
                                        <span className="sr-only">Verified</span>
                                    </Badge>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <div className="flex items-center justify-start gap-2 p-2">
                                <div className="flex flex-col space-y-1 leading-none">
                                    <p className="font-medium">{user.name}</p>
                                    <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="secondary" className="text-xs">
                                            {user.batch}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                            {user.state}
                                        </Badge>
                                        {user.isVerified && <Badge className="text-xs bg-green-500">Verified</Badge>}
                                    </div>
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/transactions" className="flex items-center">
                                    <Receipt className="mr-2 h-4 w-4" />
                                    <span>Transactions</span>
                                </Link>
                            </DropdownMenuItem>
                            {user.role === "admin" && (
                                <DropdownMenuItem asChild>
                                    <Link href="/admin" className="flex items-center">
                                        <Shield className="mr-2 h-4 w-4" />
                                        <span>Admin Panel</span>
                                    </Link>
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <nav className="md:hidden">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-50">
                    <Logo size="sm" />
                    <div className="flex items-center space-x-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="relative">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback className="text-xs">
                                            {user.name
                                                .split(" ")
                                                .map((n: string) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    {user.isVerified && (
                                        <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 bg-green-500">
                                            <span className="sr-only">Verified</span>
                                        </Badge>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <div className="flex items-center justify-start gap-2 p-2">
                                    <div className="flex flex-col space-y-1 leading-none">
                                        <p className="font-medium text-sm">{user.name}</p>
                                        <p className="w-[180px] truncate text-xs text-muted-foreground">{user.email}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Badge variant="secondary" className="text-xs">
                                                {user.batch}
                                            </Badge>
                                            {user.isVerified && <Badge className="text-xs bg-green-500">Verified</Badge>}
                                        </div>
                                    </div>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/transactions" className="flex items-center">
                                        <Receipt className="mr-2 h-4 w-4" />
                                        <span>Transactions</span>
                                    </Link>
                                </DropdownMenuItem>
                                {user.role === "admin" && (
                                    <DropdownMenuItem asChild>
                                        <Link href="/admin" className="flex items-center">
                                            <Shield className="mr-2 h-4 w-4" />
                                            <span>Admin Panel</span>
                                        </Link>
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Mobile Bottom Navigation */}
                <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t z-50">
                    <div className="flex items-center justify-around py-2">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${isActive ? "text-primary" : "text-muted-foreground"
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="text-xs font-medium">{item.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </nav>
        </>
    )
}
