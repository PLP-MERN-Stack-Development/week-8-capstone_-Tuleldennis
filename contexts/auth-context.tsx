"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { type AuthState, authService } from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
  })

  useEffect(() => {
    // Check for existing user on mount
    const user = authService.getCurrentUser()
    setState({ user, isLoading: false })
  }, [])

  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }))

    const { user, error } = await authService.login(email, password)

    if (user) {
      setState({ user, isLoading: false })
      return { success: true }
    } else {
      setState((prev) => ({ ...prev, isLoading: false }))
      return { success: false, error: error || "Login failed" }
    }
  }

  const register = async (email: string, password: string, name: string) => {
    setState((prev) => ({ ...prev, isLoading: true }))

    const { user, error } = await authService.register(email, password, name)

    if (user) {
      setState({ user, isLoading: false })
      return { success: true }
    } else {
      setState((prev) => ({ ...prev, isLoading: false }))
      return { success: false, error: error || "Registration failed" }
    }
  }

  const logout = () => {
    authService.logout()
    setState({ user: null, isLoading: false })
  }

  return <AuthContext.Provider value={{ ...state, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
