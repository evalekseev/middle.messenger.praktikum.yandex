import { v4 as makeUUID } from 'uuid'
import EventBus from './EventBus'

type TProps = Record<string, any>
type TChildren = Record<string, Component>

export default class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  _element: any
  _children: TChildren | null
  _id: string
  _meta: {
    props: TProps
  }
  eventBus: EventBus
  props: TProps

  constructor(props: TProps = {}) {
    this._id = makeUUID()
    this.props = this._makePropsProxy({ ...props, _id: this._id })
    this._getChildren()

    this._meta = {
      props,
    }

    this.eventBus = new EventBus()
    this._registerEvents(this.eventBus)

    this.eventBus.emit(Component.EVENTS.INIT)
  }

  protected _registerEvents(eventBus: any) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this))
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  protected _getChildren(): void {
    const children: TChildren = {}

    Object.entries(this.props).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value
      }
    })

    this._children = children
  }

  init(): void {
    this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
  }

  protected _createResources(): void {
    this._element = this._createDocumentElement('section')
  }

  protected _createDocumentElement(tagName: string): HTMLElement | HTMLTemplateElement {
    const elementNode = document.createElement(tagName)
    return elementNode
  }

  protected _componentDidMount() {
    this.componentDidMount()
  }

  componentDidMount() {
    this.dispatchComponentDidMoun()
  }

  dispatchComponentDidMoun(dispatchDetails = {}): void {}

  protected _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    console.log('--_componentDidUpdate', oldProps, newProps)
    const response = this.shouldComponentUpdate(oldProps, newProps)
    if (response) {
      this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
    }
    this.componentDidUpdate()
  }

  componentDidUpdate() {}

  shouldComponentUpdate(oldProps: TProps, newProps: TProps) {
    if (JSON.stringify(oldProps) === JSON.stringify(newProps)) {
      return false
    }
    return true
  }

  setProps = (nextProps: TProps) => {
    if (!nextProps) {
      return
    }

    const oldProps = { ...this.props }
    this.props = Object.assign(this.props, nextProps)
    this.eventBus.emit(Component.EVENTS.FLOW_CDU, oldProps, this.props)
  }

  get element() {
    return this._element
  }

  protected _render(): void {
    const wrap = this.render()

    const elementNode = wrap.firstElementChild as HTMLElement

    if (elementNode) {
      elementNode.dataset.id = this.props._id as string

      if (this._element) {
        this._element.replaceWith(elementNode)
      } else {
        this._element = elementNode
      }
      this._initEventListeners()
    }
    this.eventBus.emit(Component.EVENTS.FLOW_CDM)
  }

  render(): DocumentFragment {
    const wrap = this._createDocumentElement('template') as HTMLTemplateElement
    return wrap.content
  }

  protected _updateProps(newProps: TProps) {
    this.props = Object.assign(this.props, newProps)
    this._getChildren()
  }

  compile(template: NewableFunction, props: TProps): DocumentFragment {
    this._updateProps(props)

    const wrap = this._createDocumentElement('template') as HTMLTemplateElement

    if (this._children) {
      Object.entries(this._children).forEach(([key, child]) => {
        this.props[key] = `<div data-id="${child._id}"></div>`
      })

      wrap.innerHTML = template(this.props)

      Object.entries(this._children).forEach(([key, child]) => {
        const replacementElement = wrap.content.querySelector(
          `[data-id="${child._id}"]`
        ) as HTMLElement
        replacementElement.replaceWith(child.element as HTMLElement)
        this.props[key] = child
      })

      return wrap.content
    }

    wrap.innerHTML = template(this.props)

    return wrap.content
  }

  protected _makePropsProxy(props: TProps) {
    const proxyProps = new Proxy(props, {
      deleteProperty() {
        throw new Error('Нет прав')
      },
    })

    return proxyProps
  }

  protected _initEventListeners() {
    this.props.events = this.initEventListeners()
    const { events = {} } = this.props

    Object.keys(events).forEach(eventName => {
      const { handle, capture = false } = events[eventName]
      this._element?.addEventListener(eventName, handle, capture)
    })
  }

  initEventListeners() {
    return this.props.events
  }

  protected _removeEventListeners() {
    const { events = {} } = this.props

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
