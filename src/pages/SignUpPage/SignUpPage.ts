import Component from '../../utils/Component'
import template from './SignUpPage.hbs'

import Validation from '../../utils/Validation/Validation'

import SignUpController from '../../services/Controllers/AuthControllers/SignUpController'

import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Link from '../../components/UI/Link'

import logo from '../../images/logo.svg'

export default class SignUpPage extends Component {
  validation: Validation
  form: HTMLFormElement
  constructor({ ...props }) {
    props.logo = logo
    super(props)
  }
  override initChildrenComponents(): void {
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

    const inputPassword = new Input({
      label: 'Пароль',
      name: 'password',
      type: 'password',
    })

    const inputFirstName = new Input({
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

    const buttonRegistration = new Button({
      title: 'Зарегистрироваться',
      class: 'button form__button button_style_submit',
      events: {
        click: {
          handle: (e: Event) => this.handleFormSubmit(e),
        },
      },
    })

    const linkEnter = new Link({
      link: '/',
      title: 'Войти',
      class: 'button button_style_onlytext',
    })

    this.children.InputEmail = inputEmail
    this.children.InputLogin = inputLogin
    this.children.InputPassword = inputPassword
    this.children.InputFirstName = inputFirstName
    this.children.InputSecondName = inputSecondName
    this.children.InputPhone = inputPhone
    this.children.ButtonRegistration = buttonRegistration
    this.children.LinkEnter = linkEnter
  }

  handleFormSubmit(e: Event) {
    e.preventDefault()
    const target = e.target as HTMLLinkElement

    if (target && this.validation.checkAll()) {
      const [...formElements] = this.form.elements
      const dataFromForm: Record<string, unknown> = {}
      formElements.forEach((el: HTMLElement) => {
        if (el.closest('input')) {
          const input = el as HTMLInputElement
          dataFromForm[input.name] = input.value
        }
      })
      SignUpController.SignUp(dataFromForm)
    }
  }

  override componentDidMount(): void {
    const form: { registration: HTMLFormElement } = document.forms as any
    this.form = form.registration
    this.validation = new Validation(this.form as HTMLFormElement, {
      first_name: 'FirstName',
      second_name: 'SecondName',
      login: 'Login',
      email: 'Email',
      password: 'Password',
      phone: 'Phone',
      message: 'Message',
    })
  }

  override render() {
    return this.compile(template)
  }
}
