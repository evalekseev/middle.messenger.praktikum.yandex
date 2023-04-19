import Component from '../../utils/Component'
import template from './ErrorPage.hbs'
import './ErrorPage.css'

export default class ErrorPage extends Component {
  override render() {
    return this.compile(template)
  }
}
