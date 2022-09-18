import Component from '../../../utils/Component'
import template from './ChatMessage.hbs'
import './ChatMessage.css'

import avatar from '../../../images/icons/icon__avatar-empty.svg'

export default class ChatMessage extends Component {
  constructor({ ...props }) {
    props.avatarPlaceholder = avatar
    super(props)
  }
  render() {
    return this.compile(template)
  }
}
