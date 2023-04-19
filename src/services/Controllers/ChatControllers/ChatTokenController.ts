import ChatTokenAPI from '../../API/ChatAPI/ChatTokenAPI'

const chatTokenAPI = new ChatTokenAPI()

const ChatTokenController = {
  async Get(chatID: string) {
    try {
      await chatTokenAPI.create(chatID)
    } catch (error) {
      console.error(error)
    }
  },
}
export default ChatTokenController
