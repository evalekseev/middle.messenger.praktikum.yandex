import connect from '../../services/Store/Connect'

import Avatar from './Avatar'

export default connect(Avatar, state => {
  const user = state.user as { avatar: string }

  if (!user) {
    return {
      avatar: null,
    }
  }

  return {
    avatar: user.avatar,
  }
})
