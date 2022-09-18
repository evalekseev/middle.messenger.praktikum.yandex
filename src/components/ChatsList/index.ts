import connect from '../../services/Store/Connect'

import ChatsList from './ChatsList'

export default connect(ChatsList, state => {
  if (state.chats) {
    const chats = state.chats as { avatar: string }[]

    const chatsForState = chats.map(chat => {
      const { avatar, ...rest } = chat
      const preparedAvatar = avatar
        ? `${process.env.BACKEND_API}/resources${avatar}`
        : avatar
      return { ...rest, avatar: preparedAvatar }
    })
    return {
      chats: chatsForState,
    }
  }

  return { chats: state.chats }
})
