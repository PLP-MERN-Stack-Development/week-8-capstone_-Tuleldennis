export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  reviewCount: number
  inStock: boolean
  featured: boolean
}

export interface CartItem {
  id: string
  productId: string
  quantity: number
  addedAt: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
  shippingAddress: {
    name: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

// Mock products data
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Modern Minimalist Chair",
    description:
      "Clean lines meet exceptional comfort in this contemporary dining chair. Crafted from sustainable materials with ergonomic design principles.",
    price: 44850,
    image: "/modern-minimalist-furniture.jpg",
    category: "furniture",
    rating: 4.9,
    reviewCount: 127,
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Handcrafted Ceramic Vase",
    description:
      "Artisan-made pottery with unique glazing techniques. Each piece is one-of-a-kind, featuring subtle variations that celebrate the handmade process.",
    price: 22350,
    image: "/handcrafted-artisan-pottery.jpg",
    category: "home-decor",
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "Sustainable Bamboo Storage Set",
    description:
      "Eco-friendly storage solutions for modern living. Made from rapidly renewable bamboo with natural antimicrobial properties.",
    price: 13350,
    image: "/sustainable-eco-friendly-home-products.jpg",
    category: "storage",
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    name: "Premium Wool Throw Blanket",
    description:
      "Luxuriously soft merino wool blanket in neutral tones. Perfect for adding warmth and texture to any living space.",
    price: 28350,
    image: "/premium-wool-throw-blanket.jpg",
    category: "textiles",
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    featured: false,
  },
  {
    id: "5",
    name: "Artisan Coffee Table",
    description:
      "Solid wood coffee table with live edge design. Each piece showcases the natural beauty of the wood grain.",
    price: 89850,
    image: "/artisan-wood-coffee-table.jpg",
    category: "furniture",
    rating: 4.9,
    reviewCount: 78,
    inStock: true,
    featured: false,
  },
  {
    id: "6",
    name: "Organic Cotton Bedding Set",
    description:
      "Breathable organic cotton sheets in calming colors. Hypoallergenic and sustainably sourced for better sleep.",
    price: 34350,
    image: "/organic-cotton-bedding-set.jpg",
    category: "textiles",
    rating: 4.8,
    reviewCount: 234,
    inStock: false,
    featured: false,
  },
]

// Helper functions for mock data
export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find((product) => product.id === id)
}

export const getFeaturedProducts = (): Product[] => {
  return mockProducts.filter((product) => product.featured)
}

export const getProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter((product) => product.category === category)
}
