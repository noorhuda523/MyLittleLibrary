const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
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
app.listen(process.env.PORT,()=>{
    console.log(`server connected to port`);
    
})