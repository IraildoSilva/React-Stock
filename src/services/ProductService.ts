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

  async listProducts() {
    const products: ProductType[] = await this.httpClient.get('/products')

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
