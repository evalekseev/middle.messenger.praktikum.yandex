import Component from '../../utils/Component'
import template from './LoginPage.hbs'

import Router from '../../services/Router'
import Validation from '../../utils/Validation'

import SignInController from '../../services/Controllers/AuthControllers/SignInController'

import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Link from '../../components/UI/Link'

import logo from '../../images/logo.svg'

export default class LoginPage extends Component {
  validation: Validation
  form: HTMLFormElement
  constructor({ ...props }) {
    props.logo = logo
    super(props)
  }

  override initChildrenComponents(): void {
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

    const buttonEnter = new Button({
      title: 'Войти',
      class: 'button form__button button_style_submit',
      events: {
        click: {
          handle: (e: Event) => this.handleSignIn(e),
        },
      },
    })

    const buttonRegistration = new Link({
      link: '/sign-up',
      title: 'Регистрация',
      class: 'link link_style_onlytext',
    })

    this.children.InputLogin = inputLogin
    this.children.InputPassword = inputPassword
    this.children.ButtonEnter = buttonEnter
    this.children.ButtonRegistration = buttonRegistration
  }

  handleChat(e: Event) {
    e.preventDefault()
    new Router().go('/messenger')
  }

  handleSignIn(e: Event) {
    e.preventDefault()

    if (this.validation.checkAll()) {
      const [...formElements] = this.form.elements
      const dataFromForm: Record<string, unknown> = {}
      formElements.forEach((el: HTMLElement) => {
        if (el.closest('input')) {
          const input = el as HTMLInputElement
          dataFromForm[input.name] = input.value
        }
      })
      SignInController.SignIn(dataFromForm)
    }
  }

  override componentDidMount(): void {
    const form: { login: HTMLFormElement } = document.forms as any
    this.form = form.login
    this.validation = new Validation(this.form, {
      login: 'Login',
      password: 'Password',
    })
  }

  render() {
    return this.compile(template)
  }
}
