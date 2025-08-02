const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const bookRoutes=require('./Router/bookRoutes');
const transactionRoutes=require('./Router/transactionRoutes');
const reviewRoutes=require('./Router/reviewRoutes');
const chatRoutes=require('./Router/chatRoutes');
const cartRoutes=require('./Router/cartRoutes');
const userRoutes=require('./Router/userRoute');
const authRoutes=require('./Router/authRoute');
const libraryRoutes=require('./Router/libraryRoute');
const notificationRoutes=require('./Router/NotificationRoute');
const paymentRoutes=require('./Router/paymentRoutes');
const uploadRoutes = require('./Router/uploadRoutes');
const { handleMulterError } = require('./middleware/upload');

const app=express();
dotenv.config({path:'./.env'})
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
        io.emit(`notification_${userId}, { message }`);
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



mongoose.connect(process.env.MONGOOSE,
    {
        useNewUrlParser:true,
       useUnifiedTopology:true
    }
).then(()=>{
    console.log("connected to database");
    
}).catch((err)=>{
    console.log('Error:',err);
    
})


app.use('/api/book',bookRoutes);
app.use('/api/transaction',transactionRoutes);
app.use('/api/review',reviewRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/payment',paymentRoutes);
app.use('/api/library',libraryRoutes);
app.use('/api/notification',notificationRoutes);
app.use('/api/upload', uploadRoutes);
app.use(handleMulterError);

server.listen(process.env.PORT, () => {
    console.log(`Server connected to port ${process.env.PORT}`);
});