import Component from '../../utils/Component'
import './ChatPage.css'
import template from './ChatPage.hbs'
import Chat from '../../components/Chat'
import ChatsList from '../../components/ChatsList'
import Profile from '../../components/Profile'
import iconToggleNav from '../../images/icons/icon__toggle-nav.svg'
import iconSearch from '../../images/icons/icon__search.svg'
import { chats, messages } from '../../data/data.json'

const profile = new Profile()

export default class ChatPage extends Component {
  override initEventListeners() {
    return {
      click: {
        handle: this.handleOpenProfile.bind(this),
      },
    }
  }

  override render() {
    return this.compile(template, {
      iconToggleNav: iconToggleNav,
      iconSearch: iconSearch,
      ChatsList: new ChatsList({ chats: chats }),
      ChatContent: new Chat({
        name: 'Content',
        messages: messages,
      }),
    })
  }

  handleOpenProfile(e: Event) {
    const target = e.target as HTMLElement
    const navToogle = target.closest(`[data-element="NavToggle"]`) as HTMLElement

    if (!navToogle) return

    const sidebar = this.element.querySelector(`[data-element="Sidebar"]`) as HTMLElement

    if (!navToogle.classList.contains('open')) {
      e.preventDefault()
      navToogle.classList.add('open')
      sidebar.appendChild(profile.element)
      this.props.ChatsList.remove()
    } else {
      e.preventDefault()
      profile.remove()
      sidebar.appendChild(this.props.ChatsList.element)
      navToogle.classList.remove('open')
    }
  }
}
