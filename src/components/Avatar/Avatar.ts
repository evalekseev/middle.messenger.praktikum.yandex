import Component from '../../utils/Component'
import template from './Avatar.hbs'
import './Avatar.css'

import avatarEmpty from '../../images/icons/icon__avatar-empty.svg'

export default class Avatar extends Component {
  constructor(props: any = {}) {
    props.avatarPlaceholder = avatarEmpty
    super(props)
  }
  render() {
    return this.compile(template)
  }
}
