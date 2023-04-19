import Component from '../../../utils/Component'
import template from './ChatHeader.hbs'
import './ChatHeader.css'

import Modal from '../../../utils/Modal'

import ChatUsers from '../ChatUsers'
import ChatSettings from '../ChatSettings'
import ChatAddUsers from '../ChatAddUsers'
import Button from '../../ui/Button'

import avatarEmpty from '../../../images/icons/icon__chat-empty.svg'

export default class ChatHeader extends Component {
  constructor({ ...props }) {
    props.avatarPlaceholder = avatarEmpty
    props.events = {
      click: {
        handle: (e: Event) => this.handleOpenChatSettings(e),
      },
    }
    super(props)
  }
  override initChildrenComponents(): void {
    const chatUsers = new ChatUsers({
      ButtonAddUserToChat: new Button({
        title: '',
        class: 'button button_style_plus',
        icon: `<span class='icon icon_plus'></span>`,
      }),
    })

    this.children.ChatUsers = chatUsers
  }

  handleOpenChatSettings(e: Event) {
    e.preventDefault()

    const target = e.target as HTMLElement
    const buttonAddUserToChat = target.closest('.button')

    if (buttonAddUserToChat) {
      const addUserToChat = new ChatAddUsers()
      new Modal(addUserToChat.element).show()
      return
    }

    const chatSettings = new ChatSettings()

    new Modal(chatSettings.element).show()
  }

  override render() {
    return this.compile(template)
  }
}
