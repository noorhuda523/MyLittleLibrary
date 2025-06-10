const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const bookRoutes=require('./Router/bookRoutes');
const transactionRoutes=require('./Router/transactionRoutes');
const reviewRoutes=require('./Router/reviewRoutes');
const chatRoutes=require('./Router/chatRoutes');
const cartRoutes=require('./Router/cartRoutes')
const app=express();
dotenv.config({path:'./.env'})

app.use(express.json());
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
app.listen(process.env.PORT,()=>{
    console.log(`server connected to port`);
    
})