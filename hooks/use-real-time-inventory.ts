"use client"

import { useState, useEffect } from "react"
import { useNotifications } from "@/contexts/notifications-context"

export function useRealTimeInventory() {
  const [inventoryUpdates, setInventoryUpdates] = useState<Record<string, number>>({})
  const { addNotification } = useNotifications()

  useEffect(() => {
    // Simulate real-time inventory updates
    const interval = setInterval(() => {
      // Randomly update inventory for some products
      const productIds = ["1", "2", "3", "4", "5", "6"]
      const randomProductId = productIds[Math.floor(Math.random() * productIds.length)]
      const randomChange = Math.floor(Math.random() * 10) - 5 // -5 to +5

      setInventoryUpdates((prev) => ({
        ...prev,
        [randomProductId]: (prev[randomProductId] || 0) + randomChange,
      }))

      // Show notification for low stock
      if (randomChange < 0 && Math.random() > 0.7) {
        addNotification({
          type: "warning",
          title: "Low Stock Alert",
          message: `Product inventory is running low. Consider restocking soon.`,
        })
      }
    }, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [addNotification])

  return inventoryUpdates
}
