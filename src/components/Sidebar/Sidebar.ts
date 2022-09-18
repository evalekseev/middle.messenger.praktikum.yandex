import Component from '../../utils/Component'
import template from './Sidebar.hbs'
import './Sidebar.css'

export default class Sidebar extends Component {
  override render() {
    return this.compile(template)
  }
}
