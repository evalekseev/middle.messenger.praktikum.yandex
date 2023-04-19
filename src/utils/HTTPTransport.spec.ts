import { expect } from 'chai'
import HTTP from './HTTPTransport'

describe('Class "HTTPtransport"', () => {
  const http = new HTTP('https://ya-praktikum.tech/api/v2')

  const userLogin = 'FaKeFaKeFaKe'
  const userId = 12345678901
  const chatId = 12345678901

  it('Test method GET: Should return message "reason" correctly', async () => {
    const res = await http.get(`/user/${userId}`).catch(error => error.message)
    expect(res).to.include('reason')
  })

  it('Test method POST: Should return message "reason" correctly', async () => {
    const preparedData = JSON.stringify({ login: `${userLogin}` })
    const res = await http
      .post(`${http}/user/search`, { data: preparedData })
      .catch(error => error.message)

    expect(res).to.include('reason')
  })

  it('Test method PUT: Should return message "reason" correctly', async () => {
    const preparedData = JSON.stringify({
      users: [userId],
      chatId: chatId,
    })
    const res = await http
      .put(`/chats/users`, { data: preparedData })
      .catch(error => error.message)

    expect(res).to.include('reason')
  })

  it('Test method DELETE: Should return message "reason" correctly', async () => {
    const preparedData = JSON.stringify({
      users: [userId],
      chatId: chatId,
    })
    const res = await http
      .delete(`/chats/users`, { data: preparedData })
      .catch(error => error.message)

    expect(res).to.include('reason')
  })
})
