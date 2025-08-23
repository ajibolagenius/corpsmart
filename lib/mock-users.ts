// Mock users for testing purposes
export interface MockUser {
  id: string
  name: string
  email: string
  password: string
  role: "user" | "admin"
  state: string
  batch: string
  callUpNumber?: string
  isVerified: boolean
  avatar?: string
  joinedAt: string
}

export const mockUsers: MockUser[] = [
  // Regular test user
  {
    id: "user-001",
    name: "Adebayo Johnson",
    email: "test@user.com",
    password: "password123",
    role: "user",
    state: "lagos",
    batch: "2024 batch a",
    callUpNumber: "NYSC/2024/123456",
    isVerified: true,
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2024-01-15",
  },
  // Admin test user
  {
    id: "admin-001",
    name: "Sarah Okafor",
    email: "admin@corpsmart.com",
    password: "admin123",
    role: "admin",
    state: "fct",
    batch: "2023 batch c",
    callUpNumber: "NYSC/2023/789012",
    isVerified: true,
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2023-08-20",
  },
  // Additional test user
  {
    id: "user-002",
    name: "Chinedu Okwu",
    email: "chinedu@test.com",
    password: "password123",
    role: "user",
    state: "anambra",
    batch: "2024 batch b",
    isVerified: false,
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2024-02-10",
  },
]

// Mock authentication functions
export const authenticateUser = (email: string, password: string): MockUser | null => {
  const user = mockUsers.find((u) => u.email === email && u.password === password)
  return user || null
}

export const getCurrentUser = (): MockUser | null => {
  // In a real app, this would check session/token
  // For testing, return the first user by default
  if (typeof window !== "undefined") {
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      return JSON.parse(savedUser)
    }
  }
  return null
}

export const setCurrentUser = (user: MockUser | null): void => {
  if (typeof window !== "undefined") {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user))
    } else {
      localStorage.removeItem("currentUser")
    }
  }
}

export const isAdmin = (user: MockUser | null): boolean => {
  return user?.role === "admin"
}
