import connect from '../../../services/Store/Connect'

import ChatSettingsUsersList from './ChatSettingsUsersList'

export default connect(ChatSettingsUsersList, state => {
  const chatUsers: any = state.chatUsers
  const chat = state.chat

  if (chatUsers && chat) {
    const chatUsersForStore = chatUsers
      .map(({ role, ...rest }: any) => {
        const _role = role === 'admin' ? role : null
        return { ...rest, role: _role }
      })
      .sort((a: any, _b: any) => (a.role === 'admin' ? -1 : 0))

    const { id: chatID } = chat as any

    return {
      chat: { id: chatID },
      chatUsers: chatUsersForStore,
    }
  }

  return {
    chat: null,
    chatUsers: null,
  }
})
