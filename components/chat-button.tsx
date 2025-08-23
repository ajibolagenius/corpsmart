"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface ChatButtonProps {
  listingId: string
  sellerId: string
  sellerName: string
  className?: string
}

export function ChatButton({ listingId, sellerId, sellerName, className }: ChatButtonProps) {
  const router = useRouter()

  const handleStartChat = () => {
    // In a real app, this would create a new chat or navigate to existing one
    // For now, we'll navigate to a mock chat
    router.push(`/chat/1`)
  }

  return (
    <Button onClick={handleStartChat} className={className} size="lg">
      <MessageCircle className="w-4 h-4 mr-2" />
      Chat with {sellerName.split(" ")[0]}
    </Button>
  )
}
