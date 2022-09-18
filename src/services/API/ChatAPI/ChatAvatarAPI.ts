import HTTP from '../../../utils/HTTPTransport'
import BaseAPI from '../BaseAPI'

const http = new HTTP(process.env.BACKEND_API)

export default class ChatAvatarAPI extends BaseAPI {
  async update(preparedData: FormData) {
    return http.put('/chats/avatar', {
      data: preparedData,
      header: 'FormData',
    })
  }
}
