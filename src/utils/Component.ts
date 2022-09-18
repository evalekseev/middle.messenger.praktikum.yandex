import { v4 as makeUUID } from 'uuid'
import EventBus from './EventBus'

type TProps = Record<string, any>
type TChildren = Record<string, any>

export default class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  _element: any
  children: TChildren
  _id: string
  _meta: {
    props: TProps
  }
  eventBus: EventBus
  props: TProps

  constructor(propsAndChilds: any = {}) {
    this._id = makeUUID()

    this.eventBus = new EventBus()

    const { children, props } = this._getChildren(propsAndChilds)

    this.children = this._makePropsProxy(children)

    this.initChildrenComponents()

    this.props = this._makePropsProxy({ ...props, _id: this._id })

    this._meta = {
      props,
    }

    this._registerEvents(this.eventBus)

    this.eventBus.emit(Component.EVENTS.INIT)
  }

  private _getChildren(propsAndChilds: any) {
    const children: TChildren = {}
    const props: TProps = {}

    Object.entries(propsAndChilds).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { children, props }
  }

  private _registerEvents(eventBus: any) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this))
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  init(): void {
    this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
  }

  initChildrenComponents(): void {}

  private _createDocumentElement(
    tagName: string
  ): HTMLElement | HTMLTemplateElement {
    const elementNode = document.createElement(tagName)
    return elementNode
  }

  private _componentDidMount() {
    this.componentDidMount()
    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount()
    })
  }

  protected componentDidMount() {}

  dispatchComponentDidMount(): void {
    this.eventBus.emit(Component.EVENTS.FLOW_CDM)
  }

  private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    const update = this.componentDidUpdate(oldProps, newProps)
    if (update) {
      this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
    }
  }

  protected componentDidUpdate(_oldProps: TProps, _newProps: TProps) {
    return true
  }

  setProps(nextProps: TProps) {
    const { children, props } = this._getChildren(nextProps)

    if (!nextProps) {
      return
    }

    if (Object.values(children).length) {
      Object.assign(this.children, children)
    }

    if (Object.values(props).length) {
      Object.assign(this.props, props)
    }
  }

  get element() {
    return this._element
  }

  elementDidMount() {}
  private _render(): void {
    const fragment = this.render()

    const elementNode = fragment.firstElementChild as HTMLElement

    elementNode.dataset.id = this.props._id as string

    if (this._element) {
      this._removeEventListeners()
      this._element.replaceWith(elementNode)
    }
    this._element = elementNode
    this._addEventListeners()
    this.elementDidMount()
  }

  render(): DocumentFragment {
    const wrap = this._createDocumentElement('template') as HTMLTemplateElement
    return wrap.content
  }

  compile(template: (context: any) => string): DocumentFragment {
    const copyProps = { ...this.props }

    const wrap = this._createDocumentElement('template') as HTMLTemplateElement

    if (this.children) {
      Object.entries(this.children).forEach(([key, child]) => {
        copyProps[key] = `<div data-id="${child._id}"></div>`
      })
      wrap.innerHTML = template(copyProps)

      Object.entries(this.children).forEach(([key, child]) => {
        const replacementElement = wrap.content.querySelector(
          `[data-id="${child._id}"]`
        ) as HTMLElement
        if (replacementElement) {
          replacementElement.replaceWith(child.element as HTMLElement)
          copyProps[key] = child
        }
      })

      return wrap.content
    }

    wrap.innerHTML = template(copyProps)

    return wrap.content
  }

  private _makePropsProxy(props: TProps) {
    return new Proxy(props, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },

      set: (target: Record<string, unknown>, prop: string, value: unknown) => {
        const oldValue = { ...target }

        target[prop] = value

        this.eventBus.emit(Component.EVENTS.FLOW_CDU, oldValue, target)

        return true
      },

      deleteProperty() {
        throw new Error('Нет прав')
      },
    })
  }

  private _addEventListeners() {
    const { events }: any = this.props

    if (!events) {
      return
    }

    Object.keys(events).forEach(eventName => {
      const { handle, capture = false } = events[eventName]
      this._element?.addEventListener(eventName, handle, capture)
    })
  }

  private _removeEventListeners() {
    const events: Record<
      string,
      { handle: (e: Event) => void; capture: boolean }
    > = this.props.events

    if (!events) {
      return
    }

    Object.keys(events).forEach(eventName => {
      const { handle, capture = false } = events[eventName]
      this._element?.removeEventListener(eventName, handle, capture)
    })
  }

  show() {
    this._element.style.display = null
  }

  hide() {
    this._element.style.display = 'none'
  }

  remove() {
    this._element.remove()
  }

  destroy() {
    this._element.remove()
    this._element = null
  }
}
