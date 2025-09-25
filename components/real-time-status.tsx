"use client"

import { useRealTimeInventory } from "@/hooks/use-real-time-inventory"
import { useRealTimeOrders } from "@/hooks/use-real-time-orders"

export function RealTimeStatus() {
  const inventoryUpdates = useRealTimeInventory()
  const orderUpdates = useRealTimeOrders()

  const hasUpdates = Object.keys(inventoryUpdates).length > 0 || orderUpdates.length > 0

  if (!hasUpdates) return null

  return (
    <div className="fixed bottom-4 right-4 bg-card border rounded-lg p-3 shadow-lg z-50">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">Real-time updates active</span>
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        {Object.keys(inventoryUpdates).length > 0 && (
          <div>Inventory: {Object.keys(inventoryUpdates).length} products updated</div>
        )}
        {orderUpdates.length > 0 && <div>Orders: {orderUpdates.length} new updates</div>}
      </div>
    </div>
  )
}
