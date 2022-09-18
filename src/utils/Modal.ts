import Overlay from './Overlay'

export default class Modal {
  _root: string
  _rootElement: HTMLElement
  _element: HTMLElement
  _content: HTMLElement
  _name: string
  _hideToggle: HTMLElement
  _overlay: Overlay
  _callback: CallableFunction | undefined

  constructor(
    content: HTMLElement,
    name = '',
    modalCallback?: CallableFunction,
    root = 'main'
  ) {
    this._content = content
    this._name = name
    this._root = root
    this._callback = modalCallback
    this._rootElement = this._getRootElement()
    this._render()
  }

  protected _getRootElement(): HTMLElement {
    return document.querySelector(this._root) as HTMLElement
  }

  protected _initEventListents() {
    this._hideToggle.addEventListener('pointerdown', () => {
      this.hide()
    })
  }

  protected _render() {
    const element = document.createElement('div')
    element.classList.add('modal__element')
    if (this._name) {
      element.classList.add(this._name)
    }
    const modal = document.createElement('div')
    modal.classList.add('modal')

    this._hideToggle = document.createElement('button')
    this._hideToggle.classList.add('modal__hide')

    element.append(this._content)
    modal.append(this._hideToggle)
    modal.append(element)

    this._element = modal
    this._initEventListents()
  }

  show() {
    this._rootElement?.append(this._element)
    this._element.classList.add('show')

    const callback: CallableFunction = () => {
      this._element.remove()
      this._element.classList.remove('show')
      if (this._callback) {
        this._callback()
      }
    }

    this._overlay = new Overlay(this._root, callback)
    this._overlay.show()
  }

  hide() {
    this._overlay.hide()
  }

  remove() {
    this._element.remove()
    this._element.classList.remove('show')
    if (this._overlay) {
      this._overlay.remove()
    }
  }
}
