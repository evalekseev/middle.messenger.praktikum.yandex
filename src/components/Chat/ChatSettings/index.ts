import connect from '../../../services/Store/Connect'

import ChatSettings from './ChatSettings'

export default connect(ChatSettings, state => {
  if (state.chat) {
    const { avatar, ...rest } = state.chat as { avatar: string }
    const preparedAvatar = avatar
      ? `${process.env.BACKEND_API}/resources${avatar}`
      : avatar

    const chatForStore = { ...rest, avatar: preparedAvatar }
    return {
      chat: chatForStore,
      chatUsers: state.chatUsers,
    }
  }
  return {
    chat: state.chat,
    chatUsers: state.chatUsers,
  }
})
