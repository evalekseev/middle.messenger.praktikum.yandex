import HTTP from '../../../utils/HTTPTransport'
import BaseAPI from '../BaseAPI'

const http = new HTTP(process.env.BACKEND_API)

export default class LogoutAPI extends BaseAPI {
  async request() {
    return http.post('/auth/logout')
  }
}
