const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
dotenv.config({ path: './.env' });

app.use(express.json());

app.use(cors({
    origin: '*', // Ya frontend ka specific domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// Create server instance for Socket.IO
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'PATCH']
    }
});

// Listening for socket connections
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Listen for chat messages
    socket.on('sendMessage', ({ senderId, receiverId, message }) => {
        console.log(`Message from ${senderId} to ${receiverId}: ${message}`);
        io.emit(`chat_${receiverId}`, { senderId, message });
    });

    // Listen for real-time notifications
    socket.on('sendNotification', ({ userId, message }) => {
        console.log(`Notification for user ${userId}: ${message}`);
        io.emit(`notification_${userId}`, { message });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Middleware to inject Socket.IO instance
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Database connection
mongoose.connect(process.env.MONGOOSE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log('Error:', err);
});

// Server should use `server.listen()` instead of `app.listen()`
server.listen(process.env.PORT, () => {
    console.log(`Server connected to port ${process.env.PORT}`);
});