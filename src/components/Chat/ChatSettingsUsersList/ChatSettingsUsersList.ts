import Component from '../../../utils/Component'
import template from './ChatSettingsUsersList.hbs'
import './ChatSettingsUsersList.css'

import ChatUserController from '../../../services/Controllers/ChatControllers/ChatUserController'

export default class ChatSettingsUsersList extends Component {
  constructor({ ...props }) {
    props.events = {
      click: {
        handle: (e: Event) => this.handleDeleteUser(e),
      },
    }
    super(props)
  }

  handleDeleteUser(e: Event) {
    e.preventDefault()
    const target = e.target as HTMLElement
    const buttonDelete = target.closest('[data-chat-user-id]') as HTMLElement
    if (buttonDelete) {
      const chatID = Number(buttonDelete.dataset.chatId)
      const userID = Number(buttonDelete.dataset.chatUserId)
      ChatUserController.Delete(chatID, userID)
    }
  }

  override render() {
    return this.compile(template)
  }
}
