import HTTP from '../../../utils/HTTPTransport'
import BaseAPI from '../BaseAPI'

const http = new HTTP(process.env.BACKEND_API)

export default class ChatAPI extends BaseAPI {
  async create(preparedData: JSON) {
    return http.post('/chats', { data: preparedData })
  }
}
