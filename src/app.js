const chatItems = document.querySelectorAll('.chat-item')

chatItems.forEach(el => {
  const countNewMessage = el.querySelector('.chat-item__count-new-message')
  if (countNewMessage.textContent == '0') {
    countNewMessage.classList.add('chat-item__count-new-message_empty')
  }
})
