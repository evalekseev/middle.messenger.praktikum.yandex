import connect from '../../services/Store/Connect'

import Avatar from './Avatar'

export default connect(Avatar, state => {
  const user = state.user as { avatar: string }
  if (user) {
    return {
      user: { avatar: user.avatar },
    }
  }
  return {
    user: { avatar: null },
  }
})
