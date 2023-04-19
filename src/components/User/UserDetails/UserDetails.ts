import Component from '../../../utils/Component'
import template from './UserDetails.hbs'
import './UserDetails.css'

export default class UserDetails extends Component {
  override render() {
    return this.compile(template)
  }
}
