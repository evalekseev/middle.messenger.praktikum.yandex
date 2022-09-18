import HTTP from '../../../utils/HTTPTransport'
import BaseAPI from '../BaseAPI'

const http = new HTTP(process.env.BACKEND_API)

export default class UserAvatarAPI extends BaseAPI {
  async update(preparedData: FormData) {
    return http.put('/user/profile/avatar', {
      data: preparedData,
      header: 'FormData',
    })
  }
}
