export interface MappedProduct {
  id: string
  name: string
  price: string
  quantity: number
  description: string
  createdAt: string
  updatedAt: string
  category: {
    id: string | null
    name: string | null
  }
}
