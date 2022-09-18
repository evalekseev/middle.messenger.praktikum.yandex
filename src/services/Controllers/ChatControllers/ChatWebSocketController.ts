import Store from '../../Store'

import WebSocketConnect from '../../../utils/WebSocketConnect'

type TWebSocketUrlConnect = {
  userId: number
  chatId: number
  chatToken: string
}

type TResopnseOldMessagesFromWS = {
  id: number
  chat_id: number
  user_id: number
  is_read: boolean
  time: string
  type: 'message'
  content: string
  file?: {
    id: number
    user_id: number
    path: string
    filename: string
    content_type: string
    content_size: number
    upload_date: string
  } | null
}

type TTransformedMessage = {
  author: string | null
  id: number
  content: string
  time: string
  user_id: number
  name: string | undefined
  avatar: string | null
}

type TResponseMessageFromWS = {
  id: number
  time: string
  user_id: number
  content: string
  type: 'message'
}

type TResponsePingFromWS = {
  type: 'pong'
}

type IResponseFromWS =
  | TResponseMessageFromWS
  | TResopnseOldMessagesFromWS
  | TResponsePingFromWS

const ChatWebSocketController = {
  Create({ userId, chatId, chatToken }: TWebSocketUrlConnect) {
    const urlForWebSocket = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${chatToken}`

    const WebSocketInstance = new WebSocketConnect(urlForWebSocket)

    Store.set('WS', WebSocketInstance)

    const { chatUsers, user: currentUser } = <
      {
        chatUsers: {
          id: number
          login: string
          display_name: string
          avatar: string
        }[]
        user: { id: number }
      }
    >Store.getState()

    WebSocketInstance.socket.addEventListener('open', () => {
      WebSocketInstance.getMessages()
    })

    WebSocketInstance.socket.addEventListener('message', async event => {
      const responseFromWS: IResponseFromWS = JSON.parse(event.data)

      if (Array.isArray(responseFromWS)) {
        const oldMessagesForState = transformOldMessages(responseFromWS)
        Store.set('ChatMessages', oldMessagesForState)
        return
      }

      function transformOldMessages(data: TResopnseOldMessagesFromWS[]) {
        return data.reduceRight((acc: TTransformedMessage[], message) => {
          const formatedMessage = transformMessage(message)
          acc.push(formatedMessage)
          return acc
        }, [])
      }

      const { type } = responseFromWS

      if (type === 'pong') {
        return
      }

      if (type === 'message') {
        const formatedMessage = transformMessage(responseFromWS)
        Store.set('NewMessage', formatedMessage)
      }

      function transformMessage(
        messageProps: TResopnseOldMessagesFromWS | TResponseMessageFromWS
      ): TTransformedMessage {
        const { id, content, time: _time, user_id } = messageProps

        function findChatUserById(userId: number) {
          return chatUsers.find(el => el.id === userId)
        }

        function transformTime(time: string) {
          const date = new Date(time)
          const hours = date.getHours()
          const minutes = date.getMinutes()
          return `${hours}:${minutes}`
        }

        const user = findChatUserById(user_id)
        const time = transformTime(_time)

        const transformedMessage = {
          author: currentUser.id === user?.id ? 'myMessage' : null,
          id,
          content,
          time: time,
          user_id,
          name: user?.display_name ? user.display_name : user?.login,
          avatar: user?.avatar ? user.avatar : null,
        }

        return transformedMessage
      }
    })
  },
}
export default ChatWebSocketController
