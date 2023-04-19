import EventBus from '../../utils/EventBus'

type Indexed<T = unknown> = {
  [key in string]: T
}

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: Indexed = {}

  public getState() {
    return this.state
  }

  public set(path: string, value: unknown) {
    this.state[path] = value
    try {
      this.emit(StoreEvents.Updated)
    } catch (error) {
      return
    }
  }
}
export default new Store()
