import HTTP from '../../../utils/HTTPTransport'
import BaseAPI from '../BaseAPI'

const http = new HTTP(process.env.BACKEND_API)

export default class ChatAddUsersAPI extends BaseAPI {
  async update(preparedData: string) {
    return http.put(`/chats/users`, { data: preparedData })
  }
}
