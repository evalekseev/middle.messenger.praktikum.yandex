import SettingsForm from './SettingsForm'
import connect from '../../../services/Store/Connect'
export default connect(SettingsForm, state => {
  return {
    user: state.user,
  }
})
