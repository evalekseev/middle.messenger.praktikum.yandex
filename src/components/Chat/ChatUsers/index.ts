import connect from '../../../services/Store/Connect'

import ChatUsers from './ChatUsers'

export default connect(ChatUsers, state => {
  const chatUsers = state.chatUsers as {
    login: string
    display_name: string
    avatar: string
  }[]
  if (chatUsers) {
    const chatUsersForProps = chatUsers.map(el => {
      return {
        login: el.login,
        display_name: el.display_name,
        avatar: el.avatar,
      }
    })
    return {
      chatUsers: chatUsersForProps,
    }
  }
  return {
    chatUsers: [],
  }
})
