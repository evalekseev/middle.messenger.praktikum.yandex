import Patterns from './Patterns'

export default class Validation {
  _patterns = Patterns

  _messages = {
    LOGIN_ERROR_MESSAGE: 'Неверный логин',
    EMAIL_ERROR_MESSAGE: 'Неверный email',
    FIRST_NAME_ERROR_MESSAGE: 'Неверное имя',
    SECOND_NAME_ERROR_MESSAGE: 'Неверная фамилия',
    PHONE_ERROR_MESSAGE: 'Неверный телефон',
    MESSAGE_ERROR_MESSAGE: null,
    PASSWORD_ERROR_MESSAGE: 'Неверный пароль',
  }

  _alias: any = {
    Login: {
      pattern: this._patterns.LOGIN_PATTERN,
      message: this._messages.LOGIN_ERROR_MESSAGE,
    },
    Email: {
      pattern: this._patterns.EMAIL_PATTERN,
      message: this._messages.EMAIL_ERROR_MESSAGE,
    },
    FirstName: {
      pattern: this._patterns.FIRST_NAME_PATTERN,
      message: this._messages.FIRST_NAME_ERROR_MESSAGE,
    },
    SecondName: {
      pattern: this._patterns.SECOND_NAME_PATTERN,
      message: this._messages.SECOND_NAME_ERROR_MESSAGE,
    },
    Phone: {
      pattern: this._patterns.PHONE_PATTERN,
      message: this._messages.PHONE_ERROR_MESSAGE,
    },
    Message: {
      pattern: this._patterns.MESSAGE_PATTERN,
      message: this._messages.MESSAGE_ERROR_MESSAGE,
    },
    Password: {
      pattern: this._patterns.PASSWORD_PATTERN,
      message: this._messages.PASSWORD_ERROR_MESSAGE,
    },
  }

  _form: HTMLFormElement
  _elements: any = {}

  constructor(form: HTMLFormElement, fields: Record<string, string>) {
    this._form = form
    this._elements = this.init(fields)
    this._initEvents()
  }

  protected _initEvents() {
    this._form.addEventListener('focus', this._handleInputFocus, true)
    this._form.addEventListener('blur', this._handleInputBlur, true)
  }

  init(fields: any) {
    const [...formElements] = this._form.elements
    const res = formElements.map((field: HTMLInputElement) => {
      const fieldName = field.name
      const isValidated = fields[fieldName] ? true : false
      const alias = this._alias[fields[fieldName]]
      const pattern = isValidated ? alias.pattern : /.*/
      const message = isValidated ? alias.message : ''
      return {
        [fieldName]: {
          field: field,
          pattern: pattern,
          message: message,
          isValidated: isValidated,
        },
      }
    })
    return Object.assign({}, ...res)
  }

  check(field: any) {
    const fieldName = field.name
    const element = this._elements[fieldName]
    const value = element.field.value
    const pattern = element.pattern
    const message = element.message
    const res = pattern.test(value)
    const messageContainer = element.field.nextElementSibling as HTMLElement
    const errorMessage = messageContainer.firstElementChild

    if (!res) {
      element.field.classList.add('invalid')
      if (!errorMessage) {
        messageContainer.append(this._showMessage(message))
      }
    } else {
      element.field.classList.remove('invalid')
    }
    return res
  }

  checkAll() {
    const res: boolean[] = []
    Object.entries(this._elements).forEach(([, props]: [string, any]) => {
      res.push(this.check(props.field))
    })
    return !res.includes(false)
  }

  protected _handleInputFocus = (e: Event) => {
    const target = e.target as HTMLElement
    if (target) {
      target.classList.remove('invalid')
    }
  }

  protected _handleInputBlur = (e: Event) => {
    const target = e.target as HTMLInputElement
    const input = target.closest('input')
    if (input && input.value.length > 0) {
      this.check(input)
      if (!target.value) {
        input.classList.remove('invalid')
      }
    }
  }

  _showMessage(message: string): HTMLElement {
    const messageElement = document.createElement('span')
    messageElement.classList.add('error_message')
    messageElement.textContent = message
    return messageElement
  }

  protected _removeEvents() {
    this._form.removeEventListener('focus', this._handleInputFocus, true)
    this._form.removeEventListener('blur', this._handleInputBlur, true)
  }

  remove() {
    this._removeEvents()
  }
}
