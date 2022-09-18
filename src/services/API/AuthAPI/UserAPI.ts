import HTTP from '../../../utils/HTTPTransport'
import BaseAPI from '../BaseAPI'

const http = new HTTP(process.env.BACKEND_API)

export default class UserAPI extends BaseAPI {
  async request() {
    return http.get('/auth/user')
  }
}
