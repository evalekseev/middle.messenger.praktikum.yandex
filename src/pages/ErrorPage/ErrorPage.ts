import Component from '../../utils/Component'
import './ErrorPage.css'
import Template from './ErrorPage.hbs'

export default class ErrorPage extends Component {
  render() {
    return this.compile(Template, this.props)
  }
}
