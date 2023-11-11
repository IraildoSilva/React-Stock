import delay from '@/utils/delay'

interface IHttpClient {
  baseURL: string
}

export class HttpClient implements IHttpClient {
  baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async get(path: string) {
    await delay(1200)
    const response = await fetch(`${this.baseURL}${path}`)
    const parsedData = await response.json()

    return parsedData
  }
}
