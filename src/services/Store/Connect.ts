import store, { StoreEvents } from './Store'
import IsEqual from '../../utils/IsEqual'

type Indexed<T = unknown> = {
  [key in string]: T
}

export default function connect(
  Component: any,
  mapStateToProps: (state: Indexed) => Indexed
) {
  return class extends Component {
    constructor(props: any = {}) {
      let state = mapStateToProps(store.getState())
      super({ ...props, ...state })
      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState())

        if (!IsEqual(state, newState)) {
          this.setProps({ ...newState })
        }

        state = newState
      })
    }
  }
}
