export default class BaseAPI {
  create(_data?: JSON | FormData | string | number) {
    throw new Error('Not implemented')
  }

  request(_data?: JSON | string | number) {
    throw new Error('Not implemented')
  }

  update(_data?: JSON | string | FormData) {
    throw new Error('Not implemented')
  }

  delete(_data?: string | FormData) {
    throw new Error('Not implemented')
  }
}
