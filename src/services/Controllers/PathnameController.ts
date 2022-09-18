import Store from '../Store'

const PathnameController = {
  async Set(pathname: string) {
    Store.set('pathname', pathname)
  },
}
export default PathnameController
