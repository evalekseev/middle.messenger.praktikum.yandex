enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD
  tries?: number
  data?: any
  query?: Record<string, any>
}

type OptionsWithoutMethod = Omit<Options, 'method'>
type OptionsWithoutTries = Omit<Options, 'tries'>

export default class HTTPTransport {
  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    const URL = options.query ? this._queryStringUrl(url, options.query) : url
    return this._requestWithRetry(URL, { ...options, method: METHOD.GET })
  }
  post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this._requestWithRetry(url, { ...options, method: METHOD.POST })
  }
  put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this._requestWithRetry(url, { ...options, method: METHOD.PUT })
  }
  delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this._requestWithRetry(url, { ...options, method: METHOD.DELETE })
  }

  protected _queryStringUrl(url: string, queryObj: Record<string, any>): string {
    const urlWithQuery = new URL(url)
    Object.entries(queryObj).forEach(([name, value]) => {
      urlWithQuery.searchParams.set(name, value)
    })
    return urlWithQuery.toString()
  }

  protected async _requestWithRetry(
    url: string,
    options: Options = { method: METHOD.GET }
  ): Promise<XMLHttpRequest> {
    console.log('_requestWithRetry')
    const { tries = 1, ...OptionsWithoutTries } = options

    function onError(err: Error) {
      const triesLeft = tries - 1
      if (!triesLeft) {
        throw err
      }

      return this._requestWithRetry(url, { ...OptionsWithoutTries, tries: triesLeft })
    }

    return this._request(url, OptionsWithoutTries).catch(onError.bind(this))
  }

  protected _request(
    url: string,
    options: OptionsWithoutTries = { method: METHOD.GET }
  ): Promise<XMLHttpRequest> {
    const { method, data } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)

      if (method === METHOD.GET || !data) {
        xhr.send()
      } else {
        xhr.send(data)
      }

      xhr.onload = function () {
        resolve(xhr)
      }

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject
    })
  }
}
