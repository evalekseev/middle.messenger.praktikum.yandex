import Store from '../../Store'

const ChatMessageController = {
  async Send(message: string) {
    try {
      const { WS }: any = Store.getState()

      if (!WS) {
        return
      }
      WS.sendMessage(message)
    } catch (error) {
      throw new Error(error)
    }
  },
}
export default ChatMessageController
