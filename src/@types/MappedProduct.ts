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

export interface MappedProductToPersistance {
  name: string
  price: number
  quantity: number
  category_id: string
  description: string
}

export interface MappedAPIResponse {
  products: MappedProduct[]
  meta: {
    currentPage: number
    totalPages: number
  }
}
