import HTTP from '../../../utils/HTTPTransport'
import BaseAPI from '../BaseAPI'

const http = new HTTP(process.env.BACKEND_API)

export default class ChatDeleteUsersAPI extends BaseAPI {
  async delete(preparedData: string) {
    return http.delete(`/chats/users`, { data: preparedData })
  }
}
