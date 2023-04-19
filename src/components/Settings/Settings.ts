import Component from '../../utils/Component'
import template from './Settings.hbs'
import './Settings.css'

import Button from '../ui/Button'
import Avatar from '../../components/Avatar'
import UserDetails from '../User/UserDetails'
import SettingsForm from './SettingsForm'

import AvatarController from '../../services/Controllers/UserControllers/UserAvatarController'

export default class Settings extends Component {
  override initChildrenComponents(): void {
    const buttonChangeAvatar = new Button({
      title: '',
      class: 'button button_style_change_avatar',
      icon: `<span class='icon icon_change-avatar'></span>`,
      events: {
        click: {
          handle: (e: Event) => this.handleChangeAvatar(e),
        },
      },
    })

    const userAvatar = new Avatar()
    const userDetails = new UserDetails()
    const formSettings = new SettingsForm()

    this.children.ButtonChangeAvatar = buttonChangeAvatar
    this.children.UserDetails = userDetails
    this.children.UserAvatar = userAvatar
    this.children.FormSettings = formSettings
  }

  handleChangeAvatar(e: Event) {
    e.preventDefault()
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = () => {
      const [image]: any = input.files
      const formData = new FormData()
      formData.append('avatar', image)
      AvatarController.Change(formData)
    }
    input.click()
  }

  override render() {
    return this.compile(template)
  }
}
