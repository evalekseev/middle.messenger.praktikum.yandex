import Component from '../../utils/Component'

import Template from './RegistrationPage.hbs'

import RegistrationForm from '../../components/FormRegistration'

export default class RegistrationPage extends Component {
  override initEventListeners() {
    return {
      'form-chacked-success': {
        handle: (e: CustomEvent) => {
          console.log(e.detail.res)
        },
      },
    }
  }
  override render() {
    return this.compile(Template, {
      Form: new RegistrationForm(),
    })
  }
}
