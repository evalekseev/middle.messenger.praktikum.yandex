import HTTP from '../../../utils/HTTPTransport'
import BaseAPI from '../BaseAPI'

const http = new HTTP(process.env.BACKEND_API)

export default class SignInAPI extends BaseAPI {
  async create(preparedData: JSON) {
    return http.post('/auth/signin', { data: preparedData })
  }
}
