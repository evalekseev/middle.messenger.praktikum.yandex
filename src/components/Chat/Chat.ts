import Component from '../../utils/Component'
import template from './Chat.hbs'
import './Chat.css'

import Modal from '../../utils/Modal'

import ChatMessageController from '../../services/Controllers/ChatControllers/ChatMessageController'

import ChatMessagesList from './ChatMessagesList'
import ChatCreate from './ChatCreate'
import ChatHeader from './ChatHeader'
import Button from '../ui/Button'
import Input from '../ui/Input'

export default class Chat extends Component {
  currentChatId: number | null = null
  override initChildrenComponents(): void {
    const chatHeader = new ChatHeader()
    const chatMessagesList = new ChatMessagesList()
    const inputSendMessage = new Input({
      onlyInput: true,
      label: 'Имя',
      name: 'message',
      type: 'text',
      placeholder: 'Введите сообщение ...',
      class: 'chat-send__input',
      events: {
        change: {
          handle: (e: Event) => this.handleSendMessageToChat(e),
        },
      },
    })

    const createChatButton = new Button({
      title: 'Добавить чат',
      class: 'button',
      icon: `<span class='icon icon_chat'></span>`,
      events: {
        click: {
          handle: (e: Event) => this.handleCreateChatClick(e),
        },
      },
    })
    const chatCreate = new ChatCreate()

    this.children.ChatHeader = chatHeader
    this.children.ChatMessagesList = chatMessagesList
    this.children.InputSendMessage = inputSendMessage
    this.children.CreateChatButton = createChatButton
    this.children.ChatCreate = chatCreate
  }

  handleCreateChatClick(e: Event) {
    e.preventDefault()
    const chatCreate = new ChatCreate()
    new Modal(chatCreate.element).show()
  }

  handleSendMessageToChat(e: Event) {
    const inputSendMessage = e.target as HTMLInputElement
    const message = inputSendMessage.value
    ChatMessageController.Send(message)
    inputSendMessage.value = ''
  }

  override componentDidUpdate() {
    const { chatOpen, openSettings } = this.props.state

    if (!this.currentChatId && chatOpen) {
      this.currentChatId = chatOpen
      return true
    }

    if (openSettings) {
      return false
    }

    if (!chatOpen) {
      this.currentChatId = null
      return true
    }

    return false
  }

  override render() {
    return this.compile(template)
  }
}
