import connect from '../../services/Store/Connect'

import MessengerPage from './MessengerPage'

export default connect(MessengerPage, (state: { pathname: string }) => {
  const pathname = state.pathname

  let openSettings = false

  if (pathname === '/settings') {
    openSettings = true
  }

  const match = pathname.match(/(?<=^\/chat\/)\d+$/)
  const chatId = match ? Number(match[0]) : null

  return {
    state: { pathname, chatId, openSettings },
  }
})
