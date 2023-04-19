enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Header = 'JSON' | 'FormData'

type Options = {
  method: METHOD
  tries?: number
  data?: any
  query?: Record<string, any>
  header?: Header
}

type OptionsWithoutMethod = Omit<Options, 'method'>
type OptionsWithoutTries = Omit<Options, 'tries'>

export default class HTTPTransport {
  _baseURL: string | undefined = ''
  constructor(baseURL?: string) {
    this._baseURL = baseURL
  }

  get(url: string, options: OptionsWithoutMethod = {}) {
    const URL = options.query
      ? this._queryStringUrl(this._baseURL + url, options.query)
      : this._baseURL + url
    return this._requestWithRetry(URL, {
      ...options,
      method: METHOD.GET,
    })
  }

  post(url: string, options: OptionsWithoutMethod = {}) {
    return this._request(this._baseURL + url, {
      ...options,
      method: METHOD.POST,
    })
  }

  put(url: string, options: OptionsWithoutMethod = {}) {
    return this._requestWithRetry(this._baseURL + url, {
      ...options,
      method: METHOD.PUT,
    })
  }

  delete(url: string, options: OptionsWithoutMethod = {}) {
    return this._requestWithRetry(this._baseURL + url, {
      ...options,
      method: METHOD.DELETE,
    })
  }

  protected _queryStringUrl(
    url: string,
    queryObj: Record<string, any>
  ): string {
    const urlWithQuery = new URL(url)
    Object.entries(queryObj).forEach(([name, value]) => {
      urlWithQuery.searchParams.set(name, value)
    })
    return urlWithQuery.toString()
  }

  protected async _requestWithRetry(
    url: string,
    options: Options = { method: METHOD.GET }
  ) {
    const { tries = 1, ...OptionsWithoutTries } = options

    function onError(err: Error) {
      const triesLeft = tries - 1
      if (!triesLeft) {
        throw err
      }

      return this._requestWithRetry(url, {
        ...OptionsWithoutTries,
        tries: triesLeft,
      })
    }

    return this._request(url, OptionsWithoutTries).catch(onError.bind(this))
  }

  protected _request(
    url: string,
    options: OptionsWithoutTries = { method: METHOD.GET }
  ): Promise<any> {
    const { method, data, header = 'JSON' } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)

      if (header === 'JSON') {
        xhr.setRequestHeader('Content-Type', 'application/json')
      }

      xhr.withCredentials = true
      xhr.responseType = 'json'

      if (method === METHOD.GET || !data) {
        xhr.send()
      } else {
        xhr.send(data)
      }

      xhr.onload = function () {
        if (xhr.status !== 200) {
          const resString = JSON.stringify(xhr.response)
          reject(new Error(`( ${xhr.status} ) : ${resString}`))
        }

        if (xhr.response) {
          resolve(xhr.response)
        } else {
          resolve('Ok')
        }
      }

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject
    })
  }
}
