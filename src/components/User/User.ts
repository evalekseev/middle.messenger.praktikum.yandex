import Component from '../../utils/Component'
import template from './User.hbs'
import './User.css'

import UserController from '../../services/Controllers/UserControllers/UserController'
import UserAvatarController from '../../services/Controllers/UserControllers/UserAvatarController'

import Button from '../ui/Button'
import UserDetails from './UserDetails'
import ChatCreate from '../Chat/ChatCreate'
import Avatar from '../Avatar'
import Router from '../../services/Router'
import Modal from '../../utils/Modal'

import logo from '../../images/logo.svg'

export default class User extends Component {
  constructor(props: any = {}) {
    props.logo = logo
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

    const buttonOpenSettings = new Button({
      title: 'Настройки',
      class: 'button button_style_icon',
      icon: `<span class='icon icon_settings'></span>`,
      events: {
        click: {
          handle: (e: Event) => this.handleOpenSettings(e),
        },
      },
    })

    const buttonCreateChat = new Button({
      title: 'Добавить чат',
      class: 'button button_style_icon',
      icon: `<span class='icon icon_chat'></span>`,
      events: {
        click: {
          handle: (e: Event) => this.handleCreateChat(e),
        },
      },
    })

    const buttonLogout = new Button({
      title: 'Выход',
      class: 'button button_style_icon',
      icon: `<span class='icon icon_logout'></span>`,
      events: {
        click: {
          handle: (e: Event) => this.handleLogout(e),
        },
      },
    })

    const userDetails = new UserDetails()
    const userAvatar = new Avatar()

    this.children.UserAvatar = userAvatar
    this.children.ButtonOpenSettings = buttonOpenSettings
    this.children.ButtonCreateChat = buttonCreateChat
    this.children.UserDetails = userDetails
    this.children.ButtonLogout = buttonLogout
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
      UserAvatarController.Change(formData)
    }
    input.click()
  }

  handleOpenSettings(e: Event) {
    e.preventDefault()
    new Router().go('/settings')
  }

  handleCreateChat(e: Event) {
    e.preventDefault()
    const chatCreate = new ChatCreate()
    new Modal(chatCreate.element).show()
  }

  handleLogout(e: Event) {
    e.preventDefault()
    UserController.Logout()
  }

  override render() {
    return this.compile(template)
  }
}
