import { MappedProductToPersistance } from '@/@types/MappedProduct'
import delay from '@/utils/delay'

interface IHttpClient {
  baseURL: string
}

interface IRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: MappedProductToPersistance
  headers?: {
    name: string
    value: string
  }
}

export class HttpClient implements IHttpClient {
  baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  get(path: string) {
    return this.makeRequest(path, {
      method: 'GET',
    })
  }

  post(path: string, body: MappedProductToPersistance) {
    return this.makeRequest(path, {
      method: 'POST',
      body,
    })
  }

  async put(path: string, body: MappedProductToPersistance) {
    return this.makeRequest(path, {
      method: 'PUT',
      body,
    })
  }

  async delete(path: string) {
    return this.makeRequest(path, {
      method: 'DELETE',
    })
  }

  async makeRequest(path: string, options: IRequestOptions) {
    await delay(1200)

    const headers = new Headers()
    if (options.body) {
      headers.append('Content-Type', 'application/json')
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value)
      })
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    })

    let responseBody

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
}
