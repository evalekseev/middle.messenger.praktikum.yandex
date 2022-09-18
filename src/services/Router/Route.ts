import Component from '../../utils/Component'
import renderPage from './RenderPage'

type Props = {
  rootQuery: string
  [name: string]: any
}

export default class Route {
  _pathname: RegExp | RegExp[]
  _pathnameAlias: string[] = []
  _blockClass: any
  _block: any
  _props: any
  _rootQuery: string

  constructor(
    pathname: string | string[],
    view: Component,
    { rootQuery, ...props }: Props
  ) {
    this._pathname = this.transformPathnameToRegExp(pathname)
    this._blockClass = view
    this._block = null
    this._props = props
    this._rootQuery = rootQuery
  }

  transformPathnameToRegExp(pathname: string | string[]): RegExp | RegExp[] {
    function chatIdToRegExp(pathname: string) {
      const newPathname = pathname.replace(':chatId', '\\d+')
      return new RegExp(`^${newPathname}$`)
    }

    if (Array.isArray(pathname)) {
      const pattern = pathname.map(el => {
        if (el.includes(':chatId')) {
          const chatIdPathname = chatIdToRegExp(el)
          return chatIdPathname
        }
        return new RegExp(`^${el}$`)
      })
      return pattern
    }

    if (pathname.includes(':chatId')) {
      const chatIdPathname = chatIdToRegExp(pathname)
      return new RegExp(`^${chatIdPathname}$`)
    }

    return new RegExp(`^${pathname}$`)
  }

  navigate(_pathname: string) {
    if (this.match(_pathname)) {
      this.render()
    }
  }

  leave() {
    if (this._block) {
      this._block.remove()
    }
  }

  match(pathname: string) {
    if (Array.isArray(this._pathname)) {
      const match = this._pathname.find(el => el.test(pathname))
      return match ? true : false
    }

    return this._pathname.test(pathname)
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props)
    }

    renderPage(this._rootQuery, this._block)
  }
}
