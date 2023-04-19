import Store from '../../Store'

import ChatsAPI from '../../API/ChatsAPI/ChatsAPI'
import CreateChatPAI from '../../API/ChatAPI/ChatAPI'

const chatsAPI = new ChatsAPI()
const createChatPAI = new CreateChatPAI()

const ChatsController = {
  async Get() {
    try {
      const data = await chatsAPI.request()

      const chatsForStore = data.map(({ last_message, ...rest }) => {
        if (last_message) {
          const date = new Date(last_message.time)
          const hours = date.getHours()
          const minutes = date.getMinutes()
          last_message.time = `${hours}:${minutes}`
        }

        return { ...rest, last_message }
      })

      Store.set('chats', chatsForStore)
    } catch (error) {
      console.error(error)
    }
  },
  async Create(chatName: any) {
    const req = { title: chatName }
    const JSONPreparedData = JSON.stringify(req) as unknown as JSON
    try {
      await createChatPAI.create(JSONPreparedData)
      return { success: chatName }
    } catch (error) {
      console.error(error)
      return { error: 'А вот что тут я хз )' }
    }
  },
}
export default ChatsController
