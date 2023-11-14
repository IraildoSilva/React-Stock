import { ApiResponseType, ProductType } from '@/@types/ProductType'
import { productMapper } from './ProductMapper'
import { HttpClient } from '../utils/HttpClient'
import { z } from 'zod'
import { formSchema } from '@/lib/formSchema'
import { MappedAPIResponse } from '@/@types/MappedProduct'

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

    const data: ApiResponseType = await this.httpClient.get(path)

    const mappedData: MappedAPIResponse = {
      ...data,
      products: data.products.map(productMapper.toDomain),
    }

    return mappedData
  }

  async getProductById(id: string) {
    const product: ProductType = await this.httpClient.get(`/products/${id}`)

    return productMapper.toDomain(product)
  }

  async createProduct(data: z.infer<typeof formSchema>) {
    const mappedToPersistance = productMapper.toPersistance(data)

    return this.httpClient.post('/products', mappedToPersistance)
  }

  async updateProduct(id: string, data: z.infer<typeof formSchema>) {
    const mappedToPersistance = productMapper.toPersistance(data)

    return this.httpClient.put(`/products/${id}`, mappedToPersistance)
  }

  async deleteProduct(id: string) {
    await this.httpClient.delete(`/products/${id}`)
  }
}

export const productService = new ProductService()
