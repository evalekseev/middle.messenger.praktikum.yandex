import template from './Profile.hbs'
import './Profile.css'
import Component from '../../utils/Component'
import imgAvatar from '../../images/avatars/avatar5.png'
import iconAccount from '../../images/icons/icon__account.svg'
export default class Profile extends Component {
  render() {
    return this.compile(template, {
      avatar: imgAvatar,
      iconAccount: iconAccount,
    })
  }
}
