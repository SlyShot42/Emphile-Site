const socket = io.connect()
const messageContainer = document.getElementById('message-container')
const messageForm =  document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const userForm = document.getElementById('userForm')
const userFormArea = document.getElementById('userFormArea')
const messageArea = document.getElementById('messageArea')
const age = document.getElementById('age')

var socketId

appendMessage('You are talking to stranger. Say hi.')

socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    socketId = socket.id
  })

var user = {
    userGender:userForm.gender.value,
    preferredGender:userForm.searchingFor.value,
    age:userForm.age.value,
    userId:socketId
}

userForm.addEventListener('submit', e => {
    e.preventDefault()
    socket.emit('new user', user, data => {
        if(data) {
            userFormArea.style.display = 'none'
            messageArea.style.display = 'block'
        }
    })
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send message', message)
    messageInput.value = ''
})

socket.on('new message', data => {
    appendMessage(`Stranger: ${data.msg}`)
})

function appendMessage(message) {
    const messageElement =  document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}