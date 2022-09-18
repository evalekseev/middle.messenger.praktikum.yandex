import Component from '../../utils/Component'
import './Button.css'

import Template from './Button.hbs'
export default class Input extends Component {
  render() {
    return this.compile(Template, this.props)
  }
}
