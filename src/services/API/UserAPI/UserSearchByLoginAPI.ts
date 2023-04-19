import HTTP from '../../../utils/HTTPTransport'
import BaseAPI from '../BaseAPI'

const http = new HTTP(process.env.BACKEND_API)

export default class UserSearchByLoginAPI extends BaseAPI {
  async create(login: string) {
    const preparedData = JSON.stringify({ login: login })
    return http.post('/user/search', { data: preparedData })
  }
}
