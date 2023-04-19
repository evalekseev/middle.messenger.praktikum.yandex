import Component from '../../../utils/Component'
import template from './ChatSettings.hbs'
import './ChatSettings.css'

import Modal from '../../../utils/Modal'
import ChatAvatarController from '../../../services/Controllers/ChatControllers/ChatAvatarController'

import ChatAddUsers from '../ChatAddUsers'
import ChatSettingsUsersList from '../ChatSettingsUsersList'
import Button from '../../ui/Button'

import avatarEmpty from '../../../images/icons/icon__chat-empty.svg'

export default class ChatSettings extends Component {
  constructor({ ...props }) {
    props.avatarPlaceholder = avatarEmpty
    super(props)
  }

  override initChildrenComponents(): void {
    const buttonChangeAvatar = new Button({
      title: '',
      class: 'button button_style_change_avatar',
      icon: `<span class='icon icon_change-avatar'></span>`,
      events: {
        click: {
          handle: (e: Event) => this.handleChangeAvatar(e),
        },
      },
    })

    const chatSettingsUsersList = new ChatSettingsUsersList()

    this.children.ChatSettingsUsersList = chatSettingsUsersList
    this.children.ButtonChangeAvatar = buttonChangeAvatar
  }

  handleChangeAvatar(e: Event) {
    e.preventDefault()
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = () => {
      const [image]: any = input.files
      const formData = new FormData()
      formData.append('avatar', image)
      formData.append('chatId', this.props.chat.id)
      ChatAvatarController.Change(formData)
    }
    input.click()
  }

  handleOpenChatSettings(e: Event) {
    e.preventDefault()

    const target = e.target as HTMLElement
    const buttonAddUserToChat = target.closest('.button')

    if (buttonAddUserToChat) {
      const chatAddUsers = new ChatAddUsers()
      new Modal(chatAddUsers.element).show()
      return
    }
  }

  override render() {
    return this.compile(template)
  }
}
