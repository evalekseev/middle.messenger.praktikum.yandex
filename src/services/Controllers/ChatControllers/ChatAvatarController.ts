import ChatAvatarAPI from '../../API/ChatAPI/ChatAvatarAPI'

const chatAvatarAPI = new ChatAvatarAPI()

import Store from '../../Store'

import ChatsController from '../ChatsControllers/ChatsController'

const ChatAvatarController = {
  async Change(FormData: FormData) {
    try {
      const data = await chatAvatarAPI.update(FormData)

      Store.set('chat', data)
      ChatsController.Get()
    } catch (error) {
      console.error(error)
    }
  },
}

export default ChatAvatarController
