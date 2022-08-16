import Component from '../../utils/Component'
import './FormLogin.css'
import Template from './FormLogin.hbs'
import Input from '../Input'
import Button from '../Button'
import Link from '../Link'
import iconAccount from '../../images/icons/icon__account.svg'
import Validation from '../../utils/Validation'

export default class FormLogin extends Component {
  validation: Validation
  handleFormSubmit(e: Event) {
    e.preventDefault()
    const target = e.target as HTMLLinkElement

    if (target && this.validation.checkAll()) {
      const form = this.element as HTMLFormElement
      const [...formElements] = form.elements
      const dataForm: Record<string, unknown> = {}
      formElements.forEach((el: HTMLInputElement) => {
        dataForm[el.name] = el.value
      })
      const dispatchDetails = dataForm
      this.dispatchComponentDidMoun(dispatchDetails)
      window.document.location = '/chats'
    }
  }

  override componentDidMount(): void {
    this.validation = new Validation(this.element as HTMLFormElement, {
      login: 'Login',
      password: 'Password',
    })
  }

  override render(): DocumentFragment {
    return this.compile(Template, {
      InputLogin: new Input({
        label: 'Логин',
        name: 'login',
        type: 'text',
      }),
      InputPassword: new Input({
        label: 'Пароль',
        name: 'password',
        type: 'password',
      }),
      iconAccount: iconAccount,
      ButtonEnter: new Button({
        title: 'Войти',
        class: 'button form__button button_style_submit',
        events: {
          click: {
            handle: this.handleFormSubmit.bind(this),
          },
        },
      }),
      ButtonRegistration: new Link({
        link: '/registration',
        title: 'Регистрация',
        class: 'link link_style_onlytext',
      }),
    })
  }
}
