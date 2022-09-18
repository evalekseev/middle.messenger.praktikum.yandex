import connect from '../../../services/Store/Connect'

import ChatMessagesList from './ChatMessagesList'

export default connect(ChatMessagesList, state => {
  return {
    state: {
      ChatMessages: state.ChatMessages,
      NewMessage: state.NewMessage,
    },
  }
})
