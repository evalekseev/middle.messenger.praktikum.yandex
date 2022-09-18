import Store from '../../Store'

import ChatUsersAPI from '../../API/ChatAPI/ChatUsersAPI'
import ChatAddUsersAPI from '../../API/ChatAPI/ChatAddUsersAPI'
import ChatDeleteUsersAPI from '../../API/ChatAPI/ChatDeleteUsersAPI'

const chatUsersAPI = new ChatUsersAPI()
const chatAddUsersAPI = new ChatAddUsersAPI()
const chatDeleteUsersAPI = new ChatDeleteUsersAPI()

const ChatUserController = {
  async Add(
    id: number,
    callbackMessage?: {
      error: (message: string) => void
      success: (message: string) => void
    }
  ) {
    try {
      const { chat } = <{ chat: { id: number } }>Store.getState()

      if (!chat) {
        throw new Error('Чат не найден!')
      }

      const chatID: number = chat.id

      const request = {
        users: [id],
        chatId: chatID,
      }

      const requestToJSON = JSON.stringify(request)
      await chatAddUsersAPI.update(requestToJSON)

      const chatUsersData = await chatUsersAPI.request(chatID)

      Store.set('chatUsers', chatUsersData)
    } catch (error) {
      if (callbackMessage) {
        const message = `Пользователь c ID ${id} не найден! ;(`
        callbackMessage.error(message)
      }
      console.error(error)
    }
  },
  async Delete(chatID: number, userID: number) {
    try {
      const preparedData = JSON.stringify({
        users: [userID],
        chatId: chatID,
      })
      await chatDeleteUsersAPI.delete(preparedData)

      const chatUsersForStore = await chatUsersAPI.request(chatID)

      Store.set('chatUsers', chatUsersForStore)
    } catch (error) {
      console.error(error)
    }
  },
}
export default ChatUserController
