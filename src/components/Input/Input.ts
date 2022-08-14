import Template from './Input.hbs'
import Component from '../../utils/Component'
import './Input.css'
export default class Input extends Component {
  render() {
    return this.compile(Template, this.props)
  }
}
