export default class WebSocketConnect {
  _WebSocketURL
  socket: WebSocket
  _intervalID: any
  chatMessages: any
  message: any
  constructor(url: string) {
    this._WebSocketURL = url
    this._initWebSocket()
    this._initEventListeners()
  }

  getMessages(offset = '0') {
    this.socket.send(
      JSON.stringify({
        content: offset,
        type: 'get old',
      })
    )
  }

  sendMessage(message: string) {
    this.socket.send(
      JSON.stringify({
        content: `${message}`,
        type: 'message',
      })
    )
  }

  sendFile(resourceId: string) {
    this.socket.send(
      JSON.stringify({
        content: `${resourceId}`,
        type: 'file',
      })
    )
  }

  close(code = 1000, reason = 'Пользователь покинул чат') {
    this.socket.close(code, reason)
  }

  readyState() {
    let state
    if (this.socket.readyState === 0) {
      state = 'CONNECTING'
    }
    if (this.socket.readyState === 1) {
      state = 'OPEN'
    }
    if (this.socket.readyState === 2) {
      state = 'CLOSING'
    }
    if (this.socket.readyState === 3) {
      state = 'CLOSED'
    }
    console.log('>>> WebSocket State >>>', state)
    return state
  }

  protected _ping() {
    const delay = 10000

    this._intervalID = setInterval(() => {
      this.socket.send(
        JSON.stringify({
          type: 'ping',
        })
      )
    }, delay)
  }

  protected _initWebSocket() {
    this.socket = new WebSocket(this._WebSocketURL)
    this._ping()
  }

  protected _initEventListeners() {
    this.socket.addEventListener('open', () => {
      return
    })

    this.socket.addEventListener('close', _event => {
      clearInterval(this._intervalID)
    })

    this.socket.addEventListener('message', _event => {
      return
    })

    this.socket.addEventListener('error', _event => {
      clearInterval(this._intervalID)
    })
  }
}
