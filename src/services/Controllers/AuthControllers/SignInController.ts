import SignInAPI from '../../API/AuthAPI/SignInAPI'

const SignIn = new SignInAPI()

import Router from '../../Router'

const SignInController = {
  async SignIn(data: unknown) {
    try {
      const JSONPreparedData = JSON.stringify(data) as unknown as JSON
      await SignIn.create(JSONPreparedData)
      localStorage.setItem('auth', 'ok')
      new Router().go('/messenger')
    } catch (error) {
      const reason = error.message as string

      if (reason.includes('User already in system')) {
        localStorage.setItem('auth', 'ok')
        new Router().go('/messenger')
        return
      }
    }
  },
}

export default SignInController
