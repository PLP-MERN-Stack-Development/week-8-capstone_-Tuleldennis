"use client"

import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockProducts } from "@/lib/mock-data"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CategoriesPage() {
  // Get categories with product counts
  const categories = mockProducts.reduce(
    (acc, product) => {
      const category = product.category
      if (!acc[category]) {
        acc[category] = {
          name: category
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          count: 0,
          products: [],
          image: product.image, // Use first product image as category image
        }
      }
      acc[category].count++
      acc[category].products.push(product)
      return acc
    },
    {} as Record<string, any>,
  )

  const categoryList = Object.entries(categories).map(([key, value]) => ({
    slug: key,
    ...value,
  }))

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="font-playfair text-4xl font-light mb-4">Shop by Category</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully organized collections, each featuring products that share a common theme or purpose.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryList.map((category) => (
            <Link key={category.slug} href={`/products?category=${category.slug}`}>
              <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-muted rounded-t-lg overflow-hidden relative">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-playfair text-2xl font-light text-white mb-2">{category.name}</h3>
                      <Badge variant="secondary" className="bg-white/90 text-black">
                        {category.count} {category.count === 1 ? "product" : "products"}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Starting from ${Math.min(...category.products.map((p: any) => p.price))}
                        </p>
                        <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                          <span className="font-medium">Shop Collection</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Featured Category Highlight */}
        <div className="mt-16 bg-muted/30 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-3xl font-light mb-4">Discover Our Most Popular Category</h2>
            <p className="text-muted-foreground mb-8">
              Our furniture collection features modern, minimalist designs that blend functionality with aesthetic
              appeal.
            </p>
            <Link href="/products?category=furniture">
              <div className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium">
                Explore Furniture Collection
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
