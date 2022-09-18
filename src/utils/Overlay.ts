export default class Overlay {
  _root: string
  _rootElement: HTMLElement | null
  _element: HTMLElement
  _callback: CallableFunction | undefined

  constructor(root = 'main', callback?: CallableFunction) {
    this._root = root
    this._callback = callback
    this._rootElement = this._getRootElement()
    this._render()
  }

  _getRootElement(): HTMLElement | null {
    return document.querySelector(this._root)
  }

  _initEventListeners() {
    this._element.addEventListener('pointerdown', () => {
      this.hide()
    })
  }

  show() {
    this._rootElement?.append(this._element)
    this._element.classList.add('show')
    return this
  }

  hide() {
    this.remove()
    if (this._callback) {
      this._callback()
    }
  }

  remove() {
    this._element.remove()
    this._element.classList.remove('show')
  }

  _render() {
    const element = document.createElement('div')
    element.classList.add('overlay')
    this._element = element
    this._initEventListeners()
  }
}
