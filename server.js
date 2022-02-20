const dotenv = require('dotenv')
dotenv.config({path :'./config.env'})
const app = require('./app')

// const callers = require('./util/readWriteFile.js')

// callers.caller()
// callers.newFunction()

const port = process.env.PORT || 3030
app.listen(port , () => console.log(`listen to : ${port}`))

