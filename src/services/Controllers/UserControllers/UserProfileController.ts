import Store from '../../Store'

import UserProfileChangeAPI from '../../API/UserAPI/UserProfileChangeAPI'

const userProfileChangeAPI = new UserProfileChangeAPI()

const UserProfileController = {
  async Change(dataFromForm: Record<string, string>) {
    try {
      const preparedData = JSON.stringify(dataFromForm)
      const changedUser = await userProfileChangeAPI.change(preparedData)

      const { avatar, ...rest } = changedUser

      const preparedAvatar = avatar
        ? `${process.env.BACKEND_API}/resources${avatar}`
        : avatar

      const userForStore = { ...rest, avatar: preparedAvatar }

      Store.set('user', userForStore)
    } catch (error) {
      console.error(error)
    }
  },
  async ChangePassword(dataFromForm: {
    oldPassword: string
    newPassword: string
  }) {
    try {
      const preparedData = JSON.stringify(dataFromForm)

      await userProfileChangeAPI.changePassword(preparedData)

      return { success: dataFromForm.newPassword }
    } catch (error) {
      return { error: 'Старый пароль не верен!' }
    }
  },
}
export default UserProfileController
