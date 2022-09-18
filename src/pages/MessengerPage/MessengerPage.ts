import Component from '../../utils/Component'
import template from './MessengerPage.hbs'
import './MessengerPage.css'

import Modal from '../../utils/Modal'
import Router from '../../services/Router'

import ChatController from '../../services/Controllers/ChatControllers/ChatController'
import ChatsController from '../../services/Controllers/ChatsControllers/ChatsController'

import Chat from '../../components/Chat'
import ChatsList from '../../components/ChatsList'
import User from '../../components/User'
import Settings from '../../components/Settings'
import Button from '../../components/ui/Button'

export default class MessengerLayout extends Component {
  sidebarContent: HTMLElement
  modalWithSettings: Modal
  modalIdOpen: boolean
  override initChildrenComponents(): void {
    const buttonNavToggle = new Button({
      title: 'Меню',
      class: 'button button_style_icon button_style_nav',
      icon: `<span class='icon icon_nav'></span>`,
      events: {
        click: {
          handle: (e: Event) => this.handleNavToggle(e),
        },
      },
    })

    const chat = new Chat()
    const user = new User()
    const chatsList = new ChatsList()

    this.children.Chat = chat
    this.children.User = user
    this.children.ChatsList = chatsList
    this.children.ButtonNavToggle = buttonNavToggle
  }

  handleNavToggle(e: Event) {
    e.preventDefault()
    const navToggle = e.target as HTMLElement

    if (navToggle.classList.contains('open')) {
      navToggle.classList.remove('open')
      this.children.User.remove()
      this.sidebarContent.append(this.children.ChatsList.element)
      return
    }

    navToggle.classList.add('open')
    this.children.ChatsList.remove()
    this.sidebarContent.append(this.children.User.element)
  }

  handleSettingsView() {
    const show = () => {
      const settings = new Settings()
      settings.dispatchComponentDidMount()
      this.modalWithSettings = new Modal(
        settings.element,
        'modal-settings',
        () => {
          new Router().go('/messenger')
        }
      )
      this.modalWithSettings.show()
    }
    const hide = () => {
      this.modalWithSettings.remove()
    }
    return { show, hide }
  }

  override componentDidUpdate() {
    this.hendleStateControl()
    return false
  }

  hendleStateControl() {
    const { chatId, openSettings, areChatsEmpty } = this.props.state

    if (chatId) {
      ChatController.Connect(chatId)
    }

    if (this.modalIdOpen) {
      this.handleSettingsView().hide()
    }

    if (openSettings) {
      this.handleSettingsView().show()
      this.modalIdOpen = true
    }

    if (areChatsEmpty) {
      this.children.ButtonNavToggle.element.click()
    }

    this.children.Chat.setProps({
      state: { chatOpen: chatId, openSettings, areChatsEmpty },
    })
  }

  override componentDidMount(): void {
    ChatsController.Get()
    this.sidebarContent = this.element.querySelector(
      '[data-element="sidebar-content"]'
    ) as HTMLElement

    this.hendleStateControl()
  }

  override render() {
    return this.compile(template)
  }
}
