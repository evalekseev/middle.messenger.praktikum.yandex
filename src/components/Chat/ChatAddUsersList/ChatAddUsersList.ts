import Component from '../../../utils/Component'
import template from './ChatAddUsersList.hbs'
import './ChatAddUsersList.css'

export default class ChatAddUsersList extends Component {
  render() {
    return this.compile(template)
  }
}
