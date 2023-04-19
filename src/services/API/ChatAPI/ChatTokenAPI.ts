import HTTP from '../../../utils/HTTPTransport'
import BaseAPI from '../BaseAPI'

const http = new HTTP(process.env.BACKEND_API)

type TToken = { token: string }

export default class ChatTokenAPI extends BaseAPI {
  async create(chatId: number): Promise<TToken> {
    return http.post(`/chats/token/${chatId}`)
  }
}
