import SignUpAPI from '../../API/AuthAPI/SignUpAPI'

const signUpAPI = new SignUpAPI()

import Router from '../../Router'

const SignUpController = {
  async SignUp(data: any) {
    const JSONPreparedData = JSON.stringify(data) as unknown as JSON
    try {
      await signUpAPI.create(JSONPreparedData)
      new Router().go('/messenger')
    } catch (error) {
      console.error(error)
    }
  },
}
export default SignUpController
