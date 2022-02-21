const userRouter = require('./router/userRouter')
const taskRouter = require('./router/taskRouter')
const express = require('express')
const app = express()

// response body middleware
app.use(express.json())

// api routes

app.get('/' , (req , res) => res.send(`<h1> Welcome to taskyleaf App </h1> \n 
<img src="https://media1.giphy.com/media/uMUcWg5fIQhWM/giphy.gif?cid=ecf05e470jp41xxobququlsbjxjuk7wpdhcgxq7ujvde3az6&rid=giphy.gif&ct=g" alt="description of gif" /> `))
 
// user Router
app.use('/user' , userRouter)

// task Router
app.use('/task' , taskRouter)

module.exports = app    
