import Component from '../../../utils/Component'
import template from './SettingsForm.hbs'
import './SettingsForm.css'

import Modal from '../../../utils/Modal'
import Validation from '../../../utils/Validation'

import UserProfileController from '../../../services/Controllers/UserControllers/UserProfileController'

import Input from '../../ui/Input'
import Button from '../../ui/Button'
import FormChangePassword from '../SettingsFormChangePassword'

export default class FormSettings extends Component {
  handleValidationFrom: Validation

  override initChildrenComponents(): void {
    const inputDisplayName = new Input({
      label: 'Никнейм',
      name: 'display_name',
      type: 'text',
    })

    const inputEmail = new Input({
      label: 'Email',
      name: 'email',
      type: 'text',
    })

    const inputLogin = new Input({
      label: 'Логин',
      name: 'login',
      type: 'text',
    })

    const inputName = new Input({
      label: 'Имя',
      name: 'first_name',
      type: 'text',
    })

    const inputSecondName = new Input({
      label: 'Фамилия',
      name: 'second_name',
      type: 'text',
    })

    const inputPhone = new Input({
      label: 'Телефон',
      name: 'phone',
      type: 'text',
    })

    const buttonChangeUserProfile = new Button({
      title: 'Изменить',
      class: 'button button__submit button_style_submit',
      events: {
        click: {
          handle: (e: Event) => this.handleChangeUserProfile(e),
        },
      },
    })

    const buttonChangeUserPassword = new Button({
      title: 'Сменить пароль',
      class: 'button button__password button_style_icon',
      icon: `<span class='icon icon_password'></span>`,
      events: {
        click: {
          handle: (e: Event) => this.handleChangePassword(e),
        },
      },
    })

    this.children.InputDisplayName = inputDisplayName
    this.children.InputLogin = inputLogin
    this.children.InputEmail = inputEmail
    this.children.InputName = inputName
    this.children.InputSecondName = inputSecondName
    this.children.InputPhone = inputPhone
    this.children.ButtonChangeUserProfile = buttonChangeUserProfile
    this.children.ButtonChangeUserPassword = buttonChangeUserPassword
  }

  handleChangeUserProfile(e: Event) {
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

      UserProfileController.Change(dataFromForm)
    }
  }

  handleChangePassword(e: Event) {
    e.preventDefault()

    const formChangePassword = new FormChangePassword()
    formChangePassword.componentDidMount()

    new Modal(
      formChangePassword.element,
      '.modal-change-password',
      () => {},
      '.modal-settings'
    ).show()
  }

  handleDataForForm() {
    const form = this.element as HTMLFormElement
    const [...elements] = form.elements

    elements.forEach((input: HTMLInputElement) => {
      if (input.tagName.toLocaleLowerCase() === 'input') {
        input.classList.add('onvalue')
        input.disabled = false
        if (this.props.user) {
          input.value = this.props.user[input.name]
        }
      }
    })
  }

  override componentDidMount(): void {
    this.handleDataForForm()
    this.handleValidationFrom = new Validation(
      this.element as HTMLFormElement,
      {
        first_name: 'FirstName',
        second_name: 'SecondName',
        login: 'Login',
        email: 'Email',
        phone: 'Phone',
      }
    )
  }

  override render() {
    return this.compile(template)
  }
}
