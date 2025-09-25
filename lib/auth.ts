export interface User {
  id: string
  email: string
  name: string
  role: "customer" | "admin"
  createdAt: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
}

// Mock user storage
const USERS_KEY = "ecommerce_users"
const CURRENT_USER_KEY = "ecommerce_current_user"

export const authService = {
  // Get all users from localStorage
  getUsers(): User[] {
    if (typeof window === "undefined") return []
    const users = localStorage.getItem(USERS_KEY)
    return users ? JSON.parse(users) : []
  },

  // Save users to localStorage
  saveUsers(users: User[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  },

  // Initialize with admin user if no users exist
  initializeUsers(): void {
    const users = this.getUsers()
    if (users.length === 0) {
      const adminUser: User = {
        id: "admin-1",
        email: "admin@luxecommerce.com",
        name: "Admin User",
        role: "admin",
        createdAt: new Date().toISOString(),
      }
      this.saveUsers([adminUser])

      // Store admin password
      const passwords = { "admin@luxecommerce.com": "admin123" }
      localStorage.setItem("ecommerce_passwords", JSON.stringify(passwords))
    }
  },

  // Register new user
  async register(email: string, password: string, name: string): Promise<{ user: User | null; error: string | null }> {
    this.initializeUsers()
    const users = this.getUsers()

    // Check if user already exists
    if (users.find((u) => u.email === email)) {
      return { user: null, error: "User already exists with this email" }
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: "customer",
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    this.saveUsers(users)

    // Store password separately (in real app, this would be hashed and stored securely)
    const passwords = JSON.parse(localStorage.getItem("ecommerce_passwords") || "{}")
    passwords[email] = password
    localStorage.setItem("ecommerce_passwords", JSON.stringify(passwords))

    return { user: newUser, error: null }
  },

  // Login user
  async login(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    this.initializeUsers()
    const users = this.getUsers()
    const user = users.find((u) => u.email === email)

    if (!user) {
      return { user: null, error: "User not found" }
    }

    // Check password (in real app, this would be properly hashed and verified)
    const passwords = JSON.parse(localStorage.getItem("ecommerce_passwords") || "{}")
    if (passwords[email] !== password) {
      return { user: null, error: "Invalid password" }
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    return { user, error: null }
  },

  // Get current user
  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null
    this.initializeUsers()
    const user = localStorage.getItem(CURRENT_USER_KEY)
    return user ? JSON.parse(user) : null
  },

  // Logout
  logout(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(CURRENT_USER_KEY)
  },
}
