const express = require('express')
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const users = []
const connections = []

server.listen(3000)
console.log('Server running...')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/styles/styles.css', (req, res) => {
    res.sendFile(__dirname + '/styles/styles.css')
})

app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/script.js')
})


io.on('connection', socket => {
    connections.push(socket)
    console.log('Connected: %s sockets connected', connections.length)

    socket.on('disconnect', data => {
        users.splice(users.indexOf(socket.user["userId"]), 1)
        connections.splice(connections.indexOf(socket), 1)
        console.log('Disconnected: %s sockets connected', connections.length)
    })

    socket.on('send message', data => {
        socket.broadcast.emit('new message', {msg: data})
    })

    socket.on('new user', (data, callback) => {
        callback(true)
        socket.user = data
        users.push(socket.use)
    })
})
