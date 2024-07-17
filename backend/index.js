require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const app = express()
const userRouter = require('./routes/userRouter')

const cookieParser = require('cookie-parser')
const PORT = process.env.PORT
const cors = require('cors')

connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: function(origin, callback) {
        if (!origin || 
            origin.startsWith(process.env.FRONTEND_URL)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}));

  
  app.use('/', userRouter)


  app.listen(PORT, ()=> {
      console.log("server is running on ", PORT)
  })