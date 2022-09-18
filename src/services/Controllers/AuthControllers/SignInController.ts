import SignInAPI from '../../API/AuthAPI/SignInAPI'

const SignIn = new SignInAPI()

import Router from '../../Router'

const SignInController = {
  async SignIn(data: unknown) {
    try {
      const JSONPreparedData = JSON.stringify(data) as unknown as JSON
      await SignIn.create(JSONPreparedData)
      new Router().go('/messenger')
    } catch (error) {
      console.error(error)
    }
  },
}

export default SignInController
