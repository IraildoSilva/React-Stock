import { HttpClient } from '../utils/HttpClient'

interface ICategoryService {
  httpClient: HttpClient
}

class CategoryService implements ICategoryService {
  httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3003')
  }

  async get(path: string) {
    const categories = await this.httpClient.get(path)

    return categories
  }
}

export const categoryService = new CategoryService()
