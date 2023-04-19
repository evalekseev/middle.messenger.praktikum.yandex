require('jsdom-global')('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
})
import { expect } from 'chai'
import Component from '../../utils/Component'
import Router from './Router'

describe('Class "Router"', () => {
  const router = new Router('body')

  before(() => {
    const template = (props: any) => {
      const { content } = props
      return `<div id='test'>${content}$</div>`
    }

    const page1 = class Page1 extends Component {
      override render() {
        return this.compile(template)
      }
    }

    router.use('/', page1).use('/page1', page1).use('/page2', page1)
  })

  it('Should be router is singleton', () => {
    expect(new Router()).equal(router)
  })

  it('Test method USE: Should return routes length correctly', () => {
    expect(router.routes.length).equal(3)
  })
})
