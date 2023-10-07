document.addEventListener('DOMContentLoaded', () => {  //Waits for the html document to be fully loaded before running the script
const socket = io(); //Creates a websocket connection library

const loginPage = document.getElementById('loginPage'); //id of object called loginPage that is the main container of the login page
const chatPage = document.getElementById('chatPage');//id of object called chatPage that is the main container of the chat page
const usernameInput = document.getElementById('usernameInput');//id of object called usernameInput in the login page
const loginButton = document.getElementById('loginButton');//id of object called loginButton which on click takes the username and displays it in users container
const userList = document.getElementById('users');//id of object called users to display the users
const messageList = document.getElementById('messageList');//id of object called messageList to display the messages 
const messageInput = document.getElementById('messageInput');//id of object called messageInput which is a input element to type the message
const sendButton = document.getElementById('sendButton');//id of object called sendButton which on click sends the message
const logoutButton = document.getElementById('logoutButton');//id of object called logoutButton which on click logs out the user 

let username;

loginButton.addEventListener('click', () => {
    username = usernameInput.value.trim(); // Get the username entered in the input box of the login page
    if (username !== '') {
    socket.emit('login', username); // Emit a login event to the WebSocket server with the username
    loginPage.style.display = 'none';// Hide the login page by changing its display style to none
    chatPage.style.display = 'block';// Display the chat page by changing its display style to 'block'
    }
});

sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();// Get the message entered in the input box of the chat page
    if (message !== '') {  
    socket.emit('message', message); // Emit a login event to the WebSocket server with the username
    messageInput.value = ''; // Clear the entry in the message input box
    }
});

logoutButton.addEventListener('click', () => {
    socket.disconnect(); //Disconnect the websocket connection
    window.location.reload();// Reload the webpage that basically restarts the application
});

socket.on('userList', (usersArray) => {// When the WebSocket server sends a 'userList' event, this code will execute
    userList.innerHTML = '';// Clear the existing content of the 'userList' element
    usersArray.forEach((user) => { // Iterate through each user in the 'usersArray'
    const listItem = document.createElement('li');  // Create a new list item element
    listItem.textContent = user; // Set the text content of the list item to the user's name
    userList.appendChild(listItem); // Append the list item to the 'userList' element, adding it to the list of online users
    });
});

socket.on('message', (data) => { // When the WebSocket server sends a 'message' event, this code block will execute
    const message = document.createElement('div'); // Create a new <div> element to represent the message
    message.textContent = `${data.username}: ${data.text}`; // Set the text content of the message <div> with the username and text from the 'data' object
    messageList.appendChild(message); // Append the message <div> to the chat message list
});
});
