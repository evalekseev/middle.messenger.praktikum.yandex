import template from './ChatMessages.hbs'
import './ChatMessages.css'
import Component from '../../utils/Component'
import imgAvatar from '../../images/avatars/avatar4.png'
export default class Input extends Component {
  render() {
    return this.compile(template, { avatar: imgAvatar })
  }
}
