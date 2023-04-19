import Store from '../../Store'

import ChatsAPI from '../../API/ChatsAPI/ChatsAPI'
import ChatUsersAPI from '../../API/ChatAPI/ChatUsersAPI'
import ChatTokenAPI from '../../API/ChatAPI/ChatTokenAPI'

const chatsAPI = new ChatsAPI()
const chatTokenAPI = new ChatTokenAPI()
const chatUsersAPI = new ChatUsersAPI()

import ChatWebSocketController from './ChatWebSocketController'
import WebSocketConnect from '../../../utils/WebSocketConnect'

type TChat = {
  id: number
  title: string
  avatar: string
  unread_count: number
  last_message: {
    user: {
      first_name: string
      second_name: string
      avatar: string
      email: string
      login: string
      phone: string
    }
    time: string
    content: string
  }
}

type TChats = TChat[]

const ChatController = {
  async Connect(_chatId: number) {
    const { chats, chat, user, WS } = <
      { chats: TChats; chat: TChat; user: { id: number }; WS: WebSocketConnect }
    >Store.getState()

    const chatId = _chatId
    const userId = user.id

    if (chat) {
      const currentChatID = chat.id
      if (currentChatID === chatId) {
        return
      }
    }

    if (WS) {
      WS.close(1000, 'Ушел в друшое место! ))')
    }

    const [chatUsersData, { token: chatToken }] = await Promise.all([
      chatUsersAPI.request(chatId),
      chatTokenAPI.create(chatId),
    ])

    const { ...matchChat } = chats.find(
      (el: { id: number }) => el.id === chatId
    )

    Store.set('chat', matchChat)
    Store.set('chatUsers', chatUsersData)

    const webSocketUrl = {
      userId,
      chatId,
      chatToken,
    }

    ChatWebSocketController.Create(webSocketUrl)
  },
}
export default ChatController
