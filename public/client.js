document.addEventListener('DOMContentLoaded', () => {
const socket = io();

const loginPage = document.getElementById('loginPage');
const chatPage = document.getElementById('chatPage');
const usernameInput = document.getElementById('usernameInput');
const loginButton = document.getElementById('loginButton');
const userList = document.getElementById('users');
const messageList = document.getElementById('messageList');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const logoutButton = document.getElementById('logoutButton');

let username;

loginButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username !== '') {
    socket.emit('login', username);
    loginPage.style.display = 'none';
    chatPage.style.display = 'block';
    }
});

sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message !== '') {
    socket.emit('message', message);
    messageInput.value = '';
    }
});

logoutButton.addEventListener('click', () => {
    socket.disconnect();
    window.location.reload();
});

socket.on('userList', (usersArray) => {
    userList.innerHTML = '';
    usersArray.forEach((user) => {
    const listItem = document.createElement('li');
    listItem.textContent = user;
    userList.appendChild(listItem);
    });
});

socket.on('message', (data) => {
    const message = document.createElement('div');
    message.textContent = `${data.username}: ${data.text}`;
    messageList.appendChild(message);
});
});
