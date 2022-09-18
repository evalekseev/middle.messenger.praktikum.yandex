import Store from '../../Store/Store'
import Router from '../../Router'

import UserAPI from '../../API/AuthAPI/UserAPI'
import LogoutAPI from '../../API/AuthAPI/LogoutAPI'

const userAPI = new UserAPI()
const logoutAPI = new LogoutAPI()

type User = {
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

const UserController = {
  async Get() {
    try {
      const data: Awaited<User> = await userAPI.request()

      const { avatar, ...rest } = data

      const preparedAvatar = avatar
        ? `${process.env.BACKEND_API}/resources${avatar}`
        : avatar

      const userForStore = { ...rest, avatar: preparedAvatar }

      Store.set('user', userForStore)
    } catch (error) {
      throw new Error(error)
    }
  },

  async Logout() {
    try {
      await logoutAPI.request()
      localStorage.removeItem('auth')
      new Router().go('/')
    } catch (error) {
      throw new Error(error)
    }
  },
}
export default UserController
