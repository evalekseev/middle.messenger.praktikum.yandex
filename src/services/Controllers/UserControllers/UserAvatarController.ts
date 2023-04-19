import UserAvatarAPI from '../../API/UserAPI/UserAvatarAPI'

const userAvatarAPI = new UserAvatarAPI()

import Store from '../../Store'

const UserAvatarController = {
  async Change(FormData: FormData) {
    try {
      const data = await userAvatarAPI.update(FormData)
      const { avatar, ...rest } = data

      const preparedAvatar = avatar
        ? `${process.env.BACKEND_API}/resources${avatar}`
        : avatar

      const userForStore = { ...rest, avatar: preparedAvatar }

      Store.set('user', userForStore)
    } catch (error) {
      console.error(error)
    }
  },
}

export default UserAvatarController
