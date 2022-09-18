import HTTP from '../../../utils/HTTPTransport'
import BaseAPI from '../BaseAPI'

const http = new HTTP(process.env.BACKEND_API)

export default class UserAPI extends BaseAPI {
  async request(id: string) {
    return http.get(`/user/${id}`)
  }
}
