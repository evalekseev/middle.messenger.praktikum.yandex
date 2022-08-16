import Component from '../../utils/Component'
import './FormRegistration.css'
import Template from './FormRegistration.hbs'
import Input from '../Input'
import Button from '../Button'
import Link from '../Link'
import iconAccount from '../../images/icons/icon__account.svg'
import Validation from '../../utils/Validation'

export default class FormRegistration extends Component {
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

  override dispatchComponentDidMoun(dispatchDetails: unknown) {
    const event = new CustomEvent('form-chacked-success', {
      bubbles: true,
      detail: {
        type: 'success',
        res: dispatchDetails,
      },
    })
    this.element.dispatchEvent(event)
  }

  override componentDidMount(): void {
    this.validation = new Validation(this.element as HTMLFormElement, {
      first_name: 'FirstName',
      second_name: 'SecondName',
      login: 'Login',
      email: 'Email',
      password: 'Password',
      phone: 'Phone',
      message: 'Message',
    })
  }

  override render(): DocumentFragment {
    return this.compile(Template, {
      iconAccount: iconAccount,
      InputEmail: new Input({
        label: 'Email',
        name: 'email',
        type: 'text',
      }),
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
      InputFirstName: new Input({
        label: 'Имя',
        name: 'first_name',
        type: 'text',
      }),
      InputSecondName: new Input({
        label: 'Фамилия',
        name: 'second_name',
        type: 'text',
      }),
      InputPhone: new Input({
        label: 'Телефон',
        name: 'phone',
        type: 'text',
      }),
      ButtonRegistration: new Button({
        title: 'Зарегистрироваться',
        class: 'button form__button button_style_submit',
        events: {
          click: {
            handle: this.handleFormSubmit.bind(this),
          },
        },
      }),
      LinkEnter: new Link({
        link: '/',
        title: 'Войти',
        class: 'button button_style_onlytext',
      }),
    })
  }
}
