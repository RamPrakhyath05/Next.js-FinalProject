const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

const users = new Map();

io.on('connection', (socket) => {
console.log(`User connected: ${socket.id}`);

socket.on('login', (username) => {
users.set(socket.id, username);
io.emit('userList', Array.from(users.values()));
});

socket.on('message', (message) => {
const username = users.get(socket.id);
io.emit('message', { username, text: message });
});

socket.on('disconnect', () => {
const username = users.get(socket.id);
users.delete(socket.id);
io.emit('userList', Array.from(users.values()));
io.emit('message', {
    username: 'Server',
    text: `${username} has left the chat.`,
});
});
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
console.log(`Server is running on port ${port}`);
});
