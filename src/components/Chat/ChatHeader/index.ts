import connect from '../../../services/Store/Connect'

import ChatHeader from './ChatHeader'

export default connect(ChatHeader, state => {
  if (state.chat) {
    const { avatar, ...rest } = state.chat as { avatar: string }
    const preparedAvatar = avatar
      ? `${process.env.BACKEND_API}/resources${avatar}`
      : avatar

    const chatForStore = { ...rest, avatar: preparedAvatar }
    return {
      chat: chatForStore,
    }
  }
  return {
    chat: state.chat,
  }
})
