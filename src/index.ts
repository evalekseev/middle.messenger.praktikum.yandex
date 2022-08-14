import Router from './router'
import LoginPage from './pages/LoginPage'
import ChatsPage from './pages/ChatsPage'
import RegistrationPage from './pages/RegistrationPage'
import ErrorPage from './pages/ErrorPage'

const router = Router.instance()

router.addRoutes([
  { path: /^$/, page: LoginPage },
  { path: /^chats$/, page: ChatsPage },
  { path: /^registration$/, page: RegistrationPage },
])
router.setErrorPage(ErrorPage)
