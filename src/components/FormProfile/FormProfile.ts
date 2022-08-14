import template from './FormProfile.hbs'
import Component from '../../utils/Component'
import imgAvatar from '../../images/avatars/avatar5.png'
import iconAccount from '../../images/icons/icon__account.svg'
export default class FormProfile extends Component {
  render() {
    return this.compile(template, {
      avatar: imgAvatar,
      iconAccount: iconAccount,
    })
  }
}
