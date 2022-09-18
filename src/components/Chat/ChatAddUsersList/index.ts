import connect from '../../../services/Store/Connect'

import ChatAddUsersList from './ChatAddUsersList'

export default connect(ChatAddUsersList, state => {
  return {
    foundUsers: state.foundUsers,
  }
})
