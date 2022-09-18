import Router from './services/Router'

import MessengerPage from './pages/MessengerPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ErrorPage from './pages/ErrorPage'

const router = new Router()

router
  .use('/', LoginPage)
  .use(['/messenger', '/settings', '/chat/:chatId'], MessengerPage)
  .use('/sign-up', SignUpPage)
  .errorPage(ErrorPage)
  .start()
