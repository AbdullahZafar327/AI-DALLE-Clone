import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './mongoDb/connect.js';
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json({limit:'50mb'}))

app.use('/api/v1/posts',postRoutes)
app.use('/api/v1/dalle',dalleRoutes)



app.get('/',async (req,res)=>{
    res.send('Hello from DALLE')
})


const PORT = 8080;

const startServer = async () =>{

    try {
        connectDb(process.env.MONGODB_URL)
        app.listen(PORT,()=> console.log(`Server has Started on Port http://localhost:${PORT}`))
    } catch (error) {
        console.log(error)
    }
    
}

startServer();