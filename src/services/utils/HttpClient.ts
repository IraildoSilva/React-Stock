import { MappedProductToPersistance } from '@/@types/MappedProduct'
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

  async post(path: string, data: MappedProductToPersistance) {
    await delay(1200)

    const headers = new Headers()

    headers.append('Content-Type', 'application/json')

    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers,
    })

    let responseBody = null

    const contentType = response.headers.get('Content-Type')
    if (contentType?.includes('application/json')) {
      responseBody = await response.json()
    }

    if (response.ok) {
      return responseBody
    }

    throw new Error(
      responseBody.error || `${response.status} - ${response.statusText}`
    )
  }

  async put(path: string, data: MappedProductToPersistance) {
    const headers = new Headers()

    headers.append('Content-Type', 'application/json')

    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers,
    })

    let responseBody = null

    const contentType = response.headers.get('Content-Type')

    if (contentType?.includes('application/json')) {
      responseBody = await response.json()
    }

    if (response.ok) {
      return responseBody
    }

    throw new Error(
      responseBody.error || `${response.status} - ${response.statusText} `
    )
  }
}
