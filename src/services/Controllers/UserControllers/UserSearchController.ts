import Store from '../../Store'

import UserSearchByLoginAPI from '../../API/UserAPI/UserSearchByLoginAPI'

const userSearchByLoginAPI = new UserSearchByLoginAPI()

const UserSearchController = {
  async Search(
    userLogin: string,
    userID?: CallableFunction,
    callbackMessage?: {
      error: (message: string) => void
      success: (message: string) => void
    }
  ) {
    try {
      const foundUsers: [{ login: string; id: number }] =
        await userSearchByLoginAPI.create(userLogin)

      Store.set('foundUsers', foundUsers)

      if (!userID) {
        return
      }

      if (!foundUsers.length) {
        userID(null)
        throw new Error(`Пользователь ${userLogin} не найден! ;(`)
      }

      const user = foundUsers.find(({ login }) => login === userLogin)
      if (user) {
        userID(user.id)
      } else {
        userID(null)
      }
    } catch (error) {
      if (callbackMessage) {
        const message = error.message
        callbackMessage.error(message)
      }
      console.error(error.message)
    }
  },
}
export default UserSearchController
