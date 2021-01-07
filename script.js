const socket = io.connect()
const messageContainer = document.getElementById('message-container')
const messageForm =  document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const userForm = document.getElementById('userForm')
const userFormArea = document.getElementById('userFormArea')
const messageArea = document.getElementById('messageArea')
const disconButtonForm = document.getElementById('disconnecting-container')
const newconButtonForm = document.getElementById('new-connection-container')
const disconArea =  document.getElementById('disconArea')
const newconArea = document.getElementById('newconArea')

var socketId

socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    socketId = socket.id
  })

var user;

userForm.addEventListener('submit', e => {
    e.preventDefault()
    user = {
        userGender:userForm.gender.value,
        preferredGender:userForm.searchingFor.value,
        age:userForm.age.value,
    }
    console.log(user['userGender'])
    console.log(user['preferredGender'])
    console.log(user['age'])
    socket.emit('new user', user, data => {
        if(data) {
            userFormArea.style.display = 'none'
            messageArea.style.display = 'block'
            /*socket.emit('newcon', user, data => {
                if(data) {
                    appendMessage('You are talking to stranger. Say hi.')
                }
            })*/
        }
    })
})

disconButtonForm.addEventListener('submit', e => {
    e.preventDefault()
    socket.emit('discon', user, data => {
        if(data) {
            appendMessage('You have disconnected')
            disconArea.style.display = 'none'
            newconArea.style.display = 'block'
        }
    })
})

newconButtonForm.addEventListener('submit', e => {
    e.preventDefault()
    socket.emit('newcon', user, data => {
        if(data) {
            disconArea.style.display = 'block'
            newconArea.style.display = 'none'
            appendMessage('You are talking to stranger. Say hi.')
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