import HTTP from '../../../utils/HTTPTransport'
import BaseAPI from '../BaseAPI'

const http = new HTTP(process.env.BACKEND_API)

export default class UserProfileChangeAPI extends BaseAPI {
  async change(preparedData: string) {
    return http.put('/user/profile', { data: preparedData })
  }

  async changePassword(preparedData: string) {
    return http.put('/user/password', { data: preparedData })
  }
}
