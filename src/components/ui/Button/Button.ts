import Component from '../../../utils/Component'
import template from './Button.hbs'
import './Button.css'

interface IButton {
  title?: string
  icon?: string
  class?: string
  events?: Record<string, { handle: (e: Event) => void }>
}

export default class Button extends Component {
  constructor(props: IButton) {
    super(props)
  }
  render() {
    return this.compile(template)
  }
}
