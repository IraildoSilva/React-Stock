export interface MappedProduct {
  id: string
  name: string
  price: number
  quantity: number
  description: string
  createdAt: string
  updatedAt: string
  category: {
    id: string | null
    name: string | null
  }
}
