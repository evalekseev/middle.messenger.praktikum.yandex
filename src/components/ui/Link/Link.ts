import Component from '../../../utils/Component'
import './Link.css'
import Template from './Link.hbs'
export default class Link extends Component {
  render() {
    return this.compile(Template, this.props)
  }
}
