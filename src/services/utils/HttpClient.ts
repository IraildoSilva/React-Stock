interface IHttpClient {
  baseURL: string
}

export class HttpClient implements IHttpClient {
  baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async get(path: string) {
    const response = await fetch(`${this.baseURL}${path}`)
    const parsedData = await response.json()

    return parsedData
  }
}
