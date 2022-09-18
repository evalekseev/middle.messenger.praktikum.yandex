import RenderPage from '../utils/RenderPage'

export default class Router {
  static _instance: Router
  static instance() {
    if (!this._instance) {
      this._instance = new Router()
    }
    return this._instance
  }

  _routes: { path: RegExp; page: unknown }[] = []
  _page: { destroy(): void }
  _errorPage: unknown

  constructor() {
    this._initEventListeners()
  }

  protected _initEventListeners() {
    document.addEventListener('click', event => {
      const target = event.target as HTMLElement
      const link = target.closest('a') as HTMLElement
      if (!link) return
      const href = link.getAttribute('href')

      if (href && href.startsWith('/')) {
        event.preventDefault()
        this._navigate(href)
      }
    })
  }

  protected async _route() {
    const strippedPath: string = decodeURI(window.location.pathname).replace(/^\/|\/$/, '')

    let match

    for (const route of this._routes) {
      match = strippedPath.match(route.path)

      if (match) {
        this._page = await this._changePage(route.page)
        break
      }
    }

    if (!match) {
      this._page = await this._changePage(this._errorPage)
    }

    document.dispatchEvent(
      new CustomEvent('route', {
        detail: {
          page: this._page,
        },
      })
    )
  }

  protected async _changePage(page: unknown) {
    if (this._page && this._page.destroy) {
      this._page.destroy()
    }
    return await RenderPage(page)
  }

  protected _navigate(path: string) {
    history.pushState(null, '', path)
    this._route()
  }

  addRoutes(routes: { path: RegExp; page: unknown }[] = []) {
    routes.forEach(({ path, page }) => {
      this._routes.push({ path, page })
    })
  }

  setErrorPage(page: unknown) {
    this._errorPage = page
    this._listen()
  }

  protected _listen() {
    window.addEventListener('popstate', () => this._route())
    this._route()
  }
}
