import Component from '../../utils/Component'
import template from './ChatsList.hbs'
import './ChatsList.css'

import avatarEmpty from '../../images/icons/icon__chat-empty.svg'

export default class ChatsList extends Component {
  constructor({ ...props }) {
    props.avatarPlaceholder = avatarEmpty
    super(props)
  }

  render() {
    return this.compile(template)
  }
}
