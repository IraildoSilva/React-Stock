import { HttpClient } from './utils/HttpClient'
import { MappedProduct } from '@/@types/MappedProduct'

interface IProductsService {
  httpClient: HttpClient
}

class ProductService implements IProductsService {
  httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  async listProducts() {
    const products: MappedProduct[] = await this.httpClient.get('/products')

    return products
  }
}

export const productService = new ProductService()
