type TAlias = Record<string, RegExp>

export default class Validation {
  _patterns = {
    LOGIN_PATTERN: /^(?=.*\d?)(?=.*[-_A-Za-z]).{3,20}$/,
    // eslint-disable-next-line no-useless-escape
    EMAIL_PATTERN: /^[-_\.a-z0-9]+@([-_a-z0-9]+\.)+[a-z]+$/,
    NAME_PATTERN: /(^[A-Z][-a-z]{1,20}$)|(^[А-ЯЁ][-а-яё]{1,20}$)/,
    PHONE_PATTERN: /^\+?[\d]{10,15}$/,
    MESSAGE_PATTERN: /^.+$/,
    // eslint-disable-next-line no-useless-escape
    PASSWORD_PATTERN: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-!@#&()[{}\]:;',?\/*~$^+=<>]).{8,20}$/,
  }

  _alias: TAlias = {
    Login: this._patterns.LOGIN_PATTERN,
    Email: this._patterns.EMAIL_PATTERN,
    Name: this._patterns.NAME_PATTERN,
    Phone: this._patterns.PHONE_PATTERN,
    Message: this._patterns.MESSAGE_PATTERN,
    Password: this._patterns.PASSWORD_PATTERN,
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
      const pattern = isValidated ? this._alias[fields[fieldName]] : /.*/
      return { [fieldName]: { field: field, pattern: pattern, isValidated: isValidated } }
    })
    return Object.assign({}, ...res)
  }

  check(field: any) {
    const fieldName = field.name
    const element = this._elements[fieldName]
    const value = element.field.value
    const pattern = element.pattern
    const res = pattern.test(value)
    if (!res) {
      element.field.classList.add('invalid')
      // element.field.focus()
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
    if (input) {
      this.check(input)
      if (!target.value) {
        input.classList.remove('invalid')
      }
    }
  }

  protected _removeEvents() {
    this._form.removeEventListener('focus', this._handleInputFocus, true)
    this._form.removeEventListener('blur', this._handleInputBlur, true)
  }

  remove() {
    this._removeEvents()
  }
}
