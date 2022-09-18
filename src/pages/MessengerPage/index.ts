import connect from '../../services/Store/Connect'

import MessengerPage from './MessengerPage'

export default connect(
  MessengerPage,
  (state: { pathname: string; chats: [] }) => {
    const pathname = state.pathname
    const chats = state.chats
    let openSettings = false
    let areChatsEmpty = false

    if (pathname === '/settings') {
      openSettings = true
    }

    if (!chats?.length) {
      areChatsEmpty = true
    }

    const match = pathname.match(/(?<=^\/chat\/)\d+$/)
    const chatId = match ? Number(match[0]) : null

    return {
      state: { pathname, chatId, openSettings, areChatsEmpty },
    }
  }
)
