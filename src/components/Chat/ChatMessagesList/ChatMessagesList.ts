import Component from '../../../utils/Component'
import template from './ChatMessagesList.hbs'
import './ChatMessagesList.css'

import ChatsController from '../../../services/Controllers/ChatsControllers/ChatsController'

import ChatMessage from '../ChatMessage'

type TOldMessagesForList = {
  type: 'my' | 'someone'
  avatar: string
  first_name: string
  content: string
  time: string
}[]

type TTransformedMessage = {
  author: string | null
  id: number
  content: string
  time: string
  user_id: number
  name: string | undefined
  avatar: string | null
}

export default class ChatMessagesList extends Component {
  appendMessage(_newMessage: TTransformedMessage) {
    const newMessage = new ChatMessage(_newMessage).element as HTMLElement
    newMessage.classList.add('animate')
    this.element.append(newMessage)
    this.handleScrollToBottom()
  }

  initMessages() {
    const messages: TOldMessagesForList = this.props.state.ChatMessages
    const chatMessages = new DocumentFragment()

    if (!messages || !messages.length) {
      return chatMessages
    }

    const messagesElements: HTMLElement[] = messages.map(messageProps => {
      return new ChatMessage(messageProps).element
    })

    chatMessages.append(...messagesElements)

    return chatMessages
  }

  handleScrollToBottom() {
    const el = this.element as HTMLElement
    const parent = el.parentElement
    if (parent) {
      parent.scrollTop = el.scrollHeight
    }
  }

  override componentDidUpdate(_oldProps: any, _newProps: any) {
    const { NewMessage: oldMessage } = _oldProps.state
    const { NewMessage: message } = _newProps.state

    if (!message) {
      return true
    }

    if (oldMessage && oldMessage.id === message.id) {
      return true
    }

    this.appendMessage(message)
    ChatsController.Get()
    return false
  }

  override elementDidMount() {
    this.handleScrollToBottom()
  }

  override render() {
    const fragment = new DocumentFragment()
    const templateWrap = document.createElement('div')
    templateWrap.innerHTML = template(null)
    const templateElement = templateWrap.firstElementChild as HTMLElement
    const messages = this.initMessages()
    templateElement.append(messages)
    templateElement.classList.add('hide')
    fragment.append(templateElement)
    return fragment
  }
}
