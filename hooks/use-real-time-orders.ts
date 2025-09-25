"use client"

import { useState, useEffect } from "react"
import { useNotifications } from "@/contexts/notifications-context"
import { useAuth } from "@/contexts/auth-context"

export function useRealTimeOrders() {
  const [orderUpdates, setOrderUpdates] = useState<string[]>([])
  const { addNotification } = useNotifications()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    // Simulate real-time order updates
    const interval = setInterval(() => {
      const orderStatuses = ["processing", "shipped", "delivered"]
      const randomStatus = orderStatuses[Math.floor(Math.random() * orderStatuses.length)]
      const orderId = `ORD-${Date.now()}`

      setOrderUpdates((prev) => [...prev, orderId])

      // Show notification for order updates
      if (Math.random() > 0.6) {
        addNotification({
          type: "info",
          title: "Order Update",
          message: `Your order ${orderId} status has been updated to ${randomStatus}.`,
        })
      }

      // Simulate new orders for admin users
      if (user.role === "admin" && Math.random() > 0.8) {
        addNotification({
          type: "success",
          title: "New Order Received",
          message: `New order ${orderId} has been placed and requires processing.`,
        })
      }
    }, 20000) // Update every 20 seconds

    return () => clearInterval(interval)
  }, [addNotification, user])

  return orderUpdates
}
