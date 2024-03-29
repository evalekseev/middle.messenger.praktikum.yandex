import Route from './Route'

import UserController from '../Controllers/UserControllers/UserController'
import PathnameController from '../Controllers/PathnameController'

type Props = {
  [name: string]: any
}

export default class Router {
  static __instance: Router
  routes: Route[]
  publicRoutes
  errorPageBlock: Route
  history: History
  _currentRoute: Route | null
  _rootQuery: string
  constructor(rootQueryMain = 'main') {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []
    this.publicRoutes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQueryMain

    Router.__instance = this
  }

  use(pathname: string | string[], block: any, props?: Props) {
    const route = new Route(pathname, block, {
      rootQuery: this._rootQuery,
      ...props,
    })

    this.routes.push(route)

    return this
  }

  async authRoute(pathname = window.location.pathname) {
    try {
      await UserController.Get()

      if (pathname === '/' || pathname === '/sign-up') {
        this.go('/messenger')
        return
      }

      this.history.pushState({}, '', pathname)
      this._onRoute(pathname)
    } catch (_error) {
      if (pathname === '/sign-up') {
        this.history.pushState({}, '', pathname)
        this._onRoute(pathname)
        return
      }

      const pathnameLogin = '/'
      this.history.pushState({}, '', pathnameLogin)
      this._onRoute(pathnameLogin)
    }
  }

  start() {
    this._initEventListeners()
    this.authRoute()
  }

  protected _initEventListeners() {
    window.addEventListener('popstate', _event => {
      this.authRoute()
    })
    document.addEventListener('click', event => {
      const target = event.target as HTMLElement
      const link = target.closest('a') as HTMLElement

      if (!link) {
        return
      }

      const href = link.getAttribute('href')

      if (href && href.startsWith('/')) {
        event.preventDefault()
        this.go(href)
      }
    })
  }

  protected _dispatchRouteEvent(pathname: string) {
    const routeEvent = new CustomEvent('route', {
      detail: {
        pathname: pathname,
      },
    })
    document.dispatchEvent(routeEvent)
    PathnameController.Set(pathname)
  }

  protected _onRoute(pathname: string) {
    const route = this.getRoute(pathname)
    this._dispatchRouteEvent(pathname)

    if (!route) {
      this.errorPageBlock.render()
      return
    }

    if (route === this._currentRoute) {
      return
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave()
    }

    this._currentRoute = route

    route.render()
  }

  errorPage(block: any) {
    this.errorPageBlock = new Route('error', block, {
      rootQuery: this._rootQuery,
    })
    return this
  }

  go(pathname: string) {
    this.authRoute(pathname)
  }

  back() {
    this.history.back()
  }

  forward() {
    this.history.forward()
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname))
  }
}
