import { expect } from 'chai'
import Component from './Component'

describe('Class "Component"', () => {
  let testComponent: Component

  before(() => {
    const template = (props: any) => {
      const { content, Button } = props
      return `<div id='test'>${content}${Button}</div>`
    }

    const templateButton = (props: any) => {
      const { content } = props
      return `<button id="button">${content}</button>`
    }

    class Button extends Component {
      override render() {
        return this.compile(templateButton)
      }
    }

    class Test extends Component {
      override initChildrenComponents(): void {
        const button = new Button({
          content: 'Please Click',
        })
        this.children.Button = button
      }

      override render() {
        return this.compile(template)
      }
    }

    testComponent = new Test({
      content: 'Hello',
    })
  })

  it('Should render Element correctly', () => {
    expect(testComponent.element)
  })

  it('Should render Element with Props correctly', () => {
    expect(testComponent.element.textContent).to.include('Hello')
  })

  it('Should render Element after call method setProps correctly', () => {
    testComponent.setProps({ content: 'SetProps' })
    expect(testComponent.element.textContent).to.include('SetProps')
  })

  it('Should render ChildrenElement correctly', () => {
    expect(testComponent.element.firstElementChild.textContent).to.include(
      'Please Click'
    )
  })

  it('Should return ChildrenElements correctly', () => {
    expect(testComponent.children).to.be.not.empty
  })
})
