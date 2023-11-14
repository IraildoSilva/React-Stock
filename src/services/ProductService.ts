import { ProductType } from '@/@types/ProductType'
import { productMapper } from './mappers/ProductMapper'
import { HttpClient } from './utils/HttpClient'
import { z } from 'zod'
import { formSchema } from '@/lib/formSchema'

interface IProductsService {
  httpClient: HttpClient
}

class ProductService implements IProductsService {
  httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3003')
  }

  async listProducts(query?: { offset: string; limit: string }) {
    const path = query?.offset
      ? `/products?offset=${query.offset}&limit=${query.limit}`
      : '/products'

    const products: ProductType[] = await this.httpClient.get(path)

    return products.map(productMapper.toDomain)
  }

  async getProductById(id: string) {
    const product: ProductType = await this.httpClient.get(`/products/${id}`)

    return productMapper.toDomain(product)
  }

  async createProduct(data: z.infer<typeof formSchema>) {
    const mappedToPersistance = productMapper.toPersistance(data)

    return this.httpClient.post('/products', mappedToPersistance)
  }
}

export const productService = new ProductService()
