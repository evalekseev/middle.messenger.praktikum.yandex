import Component from '../../utils/Component'

import Template from './LoginPage.hbs'

import LoginForm from '../../components/FormLogin'

export default class LoginPage extends Component {
  override initEventListeners() {
    return {
      'form-chacked-success': {
        handle: (e: CustomEvent) => {
          console.log(e.detail.res)
        },
      },
    }
  }
  render() {
    return this.compile(Template, {
      Form: new LoginForm(),
    })
  }
}
