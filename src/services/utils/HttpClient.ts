import { productMapper } from '../mappers/ProductMapper'

interface IHttpClient {
  baseURL: string
}

export class HttpClient implements IHttpClient {
  constructor(baseURL: string) {
    this.baseURL = baseURL
  }
  baseURL: string

  async get(path: string) {
    const response = await fetch(`${this.baseURL}${path}`)

    const products = await response.json()

    return products.map(productMapper.toDomain)
  }
}
