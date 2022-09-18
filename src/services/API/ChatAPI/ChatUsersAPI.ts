import HTTP from '../../../utils/HTTPTransport'
import BaseAPI from '../BaseAPI'

const http = new HTTP(process.env.BACKEND_API)

type TChatUsers = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
  role: string
}

export default class ChatUsersAPI extends BaseAPI {
  async request(chatId: number) {
    return http.get(`/chats/${chatId}/users`).then((data: TChatUsers[]) => {
      data.forEach(user => {
        if (user.avatar) {
          user.avatar = `${process.env.BACKEND_API}/resources${user.avatar}`
        }
      })
      return data
    })
  }
}
