export interface MappedProduct {
  id: string
  name: string
  price: number
  quantity: number
  categoryId: string | null
  description: string
  createdAt: Date
  updatedAt: Date
}
