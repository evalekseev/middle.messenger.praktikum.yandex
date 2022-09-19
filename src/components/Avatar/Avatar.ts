import Component from '../../utils/Component'
import template from './Avatar.hbs'
import './Avatar.css'

import avatarEmpty from '../../images/icons/icon__avatar-empty.svg'

export default class Avatar extends Component {
  render() {
    return this.compile(template, {
      ...this.props,
      imageSrc: this.props.avatar || avatarEmpty,
    })
  }
}
