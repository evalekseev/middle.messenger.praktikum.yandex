import Component from '../../../utils/Component'
import template from './ChatAddUsers.hbs'
import './ChatAddUsers.css'

import ChatUserController from '../../../services/Controllers/ChatControllers/ChatUserController'
import UserSearchController from '../../../services/Controllers/UserControllers/UserSearchController'

import ChatAddUsersList from '../ChatAddUsersList'
import Input from '../../ui/Input'
import Button from '../../ui/Button'

export default class ChatAddUsers extends Component {
  inputElement: HTMLInputElement
  _errorMessage: HTMLElement | null
  override initChildrenComponents(): void {
    const chatAddUsersList = new ChatAddUsersList({
      events: {
        click: {
          handle: (e: Event) => this.handleAddUserToChat(e),
        },
      },
    })

    const inputAddUser = new Input({
      label: 'Имя',
      name: 'chat_name',
      type: 'text',
      autocomplete: 'off',
      placeholder: 'Login или ID',
      events: {
        input: {
          handle: (e: Event) => this.handleSearchUsers(e),
        },
      },
    })

    const buttonAddUser = new Button({
      title: 'Добавить',
      class:
        'button button_style_submit button_style_size_s create-chat__button',
      events: {
        click: {
          handle: (e: Event) => this.handleSubmit(e),
        },
      },
    })

    this.children.ChatAddUsersList = chatAddUsersList
    this.children.InputAddUser = inputAddUser
    this.children.ButtonAddUser = buttonAddUser
  }

  handleSearchUsers(e: Event) {
    const input = e.target as HTMLInputElement
    const value = input.value
    this.inputElement = input

    const inputWrap = this.children.InputAddUser.element as HTMLElement
    const foundList = this.children.ChatAddUsersList.element as HTMLElement

    if (this._errorMessage) {
      this._errorMessage.remove()
      this._errorMessage = null
    }

    if (value.length >= 1) {
      inputWrap.append(foundList)
      UserSearchController.Search(value)
    } else {
      foundList.remove()
    }
  }

  handleAddUserToChat(e: Event) {
    const target = e.target as HTMLElement
    const user = target.closest('[data-found-user-login]') as HTMLElement
    if (user) {
      this.inputElement.value = user.dataset.foundUserLogin
        ? user.dataset.foundUserLogin
        : this.inputElement.value
      UserSearchController.Search(this.inputElement.value)
      this.inputElement.focus()
    }
  }

  handleSubmit(e: Event) {
    e.preventDefault()
    const login = this.inputElement.value

    const callbackMessage = {
      error: (message: string) => {
        if (!this._errorMessage) {
          const el = document.createElement('div')
          el.textContent = message
          el.classList.add('chat-add-users-error')
          this._errorMessage = el
          this.element.before(this._errorMessage)
        }
      },
      success: (_message: string | number) => {
        const el = document.createElement('div')
        el.textContent = 'SUCCESS!!!!'
        this.element.before(el)
      },
    }

    if (login.match(/^\d+$/)) {
      ChatUserController.Add(Number(login), callbackMessage)
    } else {
      UserSearchController.Search(
        login,
        (id: number | null) => {
          if (id) {
            ChatUserController.Add(id)
          }
        },
        callbackMessage
      )
    }
  }

  render() {
    return this.compile(template)
  }
}
