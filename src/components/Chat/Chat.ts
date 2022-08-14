import template from './Chat.hbs'
import './Chat.css'
import Component from '../../utils/Component'
import ChatMessages from '../ChatMessages'
import iconMore from '../../images/icons/icon__more.svg'
import iconAttach from '../../images/icons/icon__attach.svg'
import avatar from '../../images/avatars/avatar4.png'
export default class Chat extends Component {
  render() {
    return this.compile(template, {
      avatar: avatar,
      iconMore: iconMore,
      iconAttach: iconAttach,
      ChatMessages: new ChatMessages({
        messages: this.props.messages,
      }),
    })
  }
}
