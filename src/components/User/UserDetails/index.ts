import connect from '../../../services/Store/Connect'

import UserDetails from './UserDetails'

export default connect(UserDetails, state => {
  const user = state.user as { login: string; display_name: string; id: string }
  if (user) {
    return {
      user: { login: user.login, display_name: user.display_name, id: user.id },
    }
  }
  return {
    user: null,
  }
})
