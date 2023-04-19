import Component from '../../../utils/Component'
import template from './SettingsFormChangePassword.hbs'
import './SettingsFormChangePassword.css'

import Validation from '../../../utils/Validation'

import UserProfileController from '../../../services/Controllers/UserControllers/UserProfileController'

import Input from '../../ui/Input'
import Button from '../../ui/Button'

export default class SettingsFormChangePassword extends Component {
  handleValidationFrom: Validation
  override initChildrenComponents(): void {
    const inputOldPassword = new Input({
      label: 'Старый пароль',
      name: 'oldPassword',
      type: 'password',
    })

    const inputPassword = new Input({
      label: 'Новый пароль',
      name: 'newPassword',
      type: 'password',
    })

    const buttonChangeSubmit = new Button({
      title: 'Изменить',
      class: 'button button__submit button_style_submit',
      events: {
        click: {
          handle: (e: Event) => this.handleChangePasswordSubmit(e),
        },
      },
    })

    this.children.InputOldPassword = inputOldPassword
    this.children.InputPassword = inputPassword
    this.children.ButtonChangeSubmit = buttonChangeSubmit
  }

  handleChangePasswordCallback(_message: { success?: string; error?: string }) {
    const messageForProps = { message: _message }

    if (!_message) {
      return
    }

    if (messageForProps.message.success) {
      this.setProps(messageForProps)
      return
    }

    if (messageForProps.message.error) {
      this.setProps(messageForProps)
      return
    }
  }

  async handleChangePasswordSubmit(e: Event) {
    e.preventDefault()

    if (this.handleValidationFrom.checkAll()) {
      const form = this.element
      const [...formElements] = form.elements
      const dataFromForm: Record<string, string> = {}
      formElements.forEach((el: HTMLElement) => {
        if (el.tagName.toLowerCase() === 'input') {
          const input = el as HTMLInputElement
          dataFromForm[input.name] = input.value
        }
      })

      const res = await UserProfileController.ChangePassword(
        dataFromForm as {
          oldPassword: string
          newPassword: string
        }
      )
      this.handleChangePasswordCallback(res)
    }
  }

  override componentDidMount(): void {
    this.handleValidationFrom = new Validation(
      this.element as HTMLFormElement,
      {
        oldPassword: 'Password',
        newPassword: 'Password',
      }
    )
  }

  override render() {
    return this.compile(template)
  }
}
