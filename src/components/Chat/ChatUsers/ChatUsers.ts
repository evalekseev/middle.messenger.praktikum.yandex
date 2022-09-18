import Component from '../../../utils/Component'
import template from './ChatUsers.hbs'
import './ChatUsers.css'

import avatarPlaceholder from '../../../images/icons/icon__avatar-empty.svg'

export default class ChatUsers extends Component {
  constructor({ ...props }) {
    props.avatarPlaceholder = avatarPlaceholder
    super(props)
  }

  override render() {
    return this.compile(template)
  }
}
