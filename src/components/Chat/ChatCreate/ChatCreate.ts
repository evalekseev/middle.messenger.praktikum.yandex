import Component from '../../../utils/Component'
import template from './ChatCreate.hbs'
import './ChatCreate.css'

import Input from '../../ui/Input'
import Button from '../../ui/Button'

import ChatsController from '../../../services/Controllers/ChatsControllers/ChatsController'

export default class CreateChat extends Component {
  constructor(props: any = {}) {
    props.CreateChatInput = new Input({
      label: 'Имя',
      name: 'chatName',
      type: 'text',
      placeholder: 'Навание чата',
    })
    props.CreateChatButton = new Button({
      title: 'Добавить',
      class:
        'button button_style_submit button_style_size_s create-chat__button',
      events: {
        click: {
          handle: (e: Event) => this.handleCreateChatSubmit(e),
        },
      },
    })
    super(props)
  }

  handleSetProps(_message: { success?: string; error?: string }) {
    const messageForProps = { message: _message }

    if (!_message) {
      return
    }

    if (messageForProps.message.success) {
      this.setProps(messageForProps)
      return
    }

    if (messageForProps.message.error) {
      this.setProps(messageForProps)
      return
    }
  }

  async handleCreateChatSubmit(e: Event) {
    e.preventDefault()
    const input = this.children.CreateChatInput
    const inputElement = input.element.children.chatName
    const value = inputElement.value
    if (value) {
      const res = await ChatsController.Create(value)
      this.handleSetProps(res)
      ChatsController.Get()
    }
  }

  render() {
    return this.compile(template)
  }
}
