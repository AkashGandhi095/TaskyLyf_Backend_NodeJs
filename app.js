
const randomUUID  = require('crypto')
const fileSystem = require('fs')
const readWriteData = require('./util/readWriteFile.js')
const express = require('express')
const app = express()

// response body middleware
app.use(express.json())


const fsPro = fileSystem.promises

class ReadWriteData {
   
    static async readUsersData() {
        const fileData = await fsPro.readFile(`./data/users.json` , 'utf-8') 
        const usersDataToJson = JSON.parse(fileData)
        return usersDataToJson
    } 

    static async writeUsersData(data) {
        const dataToString = JSON.stringify(data)
        return fsPro.writeFile('./data/users.json' , dataToString , 'utf-8')
    }

    static async readTasksData() {
        const taskData = await fsPro.readFile('./data/task.json')
        return JSON.parse(taskData)
    }
    static async writeTaskData(data) {
        const taskToString = JSON.stringify(data)
        return fsPro.writeFile('./data/task.json' , taskToString)
    }
}


//user auth data model class
class UserAuthData {
    constructor(userName , password , userId) {
        this.userName = userName
        this.password = password
        this.userId = userId
    }

    printUserDetails() {
        console.log(this.userName , this.password , this.userId)
    }
}

// task model
class TaskDataModel {

    constructor(taskId ,userId , tittle , createdTime , reminderTime , isCompleted) {
        this.taskId = taskId
        this.userId = userId
        this.tittle = tittle
        this.createdTime = createdTime 
        this.reminderTime = reminderTime 
        this.isCompleted = isCompleted
    }

    printTaskDetails() {
        console.log(this.userName , this.createdTime , this.reminderTime , this.isCompleted)
    }
}

// api routes

app.get('/' , (req , res) => res.send(`<h1> Welcome to taskyleaf App </h1> \n 
<img src="https://media1.giphy.com/media/uMUcWg5fIQhWM/giphy.gif?cid=ecf05e470jp41xxobququlsbjxjuk7wpdhcgxq7ujvde3az6&rid=giphy.gif&ct=g" alt="description of gif" /> `))

    // register user

app.post('/user' , async (req , res) => {
    const reqBody = req.body
    const userData = await ReadWriteData.readUsersData();
    console.log(userData.length);
    const newUser = new UserAuthData(reqBody.userName , reqBody.password , randomUUID())
    const findUser = userData.find(it => it.userName === newUser.userName)
    if(findUser) {
        console.log("user already exists")
        return res.json({
            message : "UserName already exists , try with other user name",
            status : 0,
            data : {},
        })
    } else {
        console.log("user not exists , add to db")
        userData.push(newUser)
        await ReadWriteData.writeUsersData(userData)
    }
    res.json({
        message : "Account Registered Successfully!!",
        status : 1 , 
        data : newUser ,
    })
})

// get task by userID
app.get('/task/:userId' , async (req , res) => {
    const userId = req.params.userId
    console.log(userId)
    const allTasks = await ReadWriteData.readTasksData()
    const filterTaskByUserId = allTasks.filter(it => it.userId === userId)
    if(filterTaskByUserId.length === 0) {
        return res.json({
            message : "tasks not found..",
            status : 0,
            data : []
        })
    }
    res.json({
        message : `total tasks : ${filterTaskByUserId.length}`,
        status : 1,
        data : filterTaskByUserId
    })
})

// add new task
app.post('/task' , async (req , res) => {
    const readTaskFromFile = await ReadWriteData.readTasksData()
    let taskId = readTaskFromFile.length+1
    const taskReqBody = req.body
    const task = new TaskDataModel(taskId ,taskReqBody.userId , taskReqBody.tittle , taskReqBody.createdTime , taskReqBody.reminderTime , taskReqBody.isCompleted)
    readTaskFromFile.push(task)
    console.log(readTaskFromFile)
    await ReadWriteData.writeTaskData(readTaskFromFile)
    res.json({
        message : "Task created successfully" ,
        status : 1 ,
        data : task
    })
})

// update task by user ID and task ID
app.patch('/task/:userId/:taskId' , async(req , res) => {
    const tasksList = await ReadWriteData.readTasksData()
    const taskIndexNo = findIndexById(req.params.userId , req.params.taskId , tasksList)
    console.log(taskIndexNo , req.params.userId , req.params.taskId)
    if(taskIndexNo === -1) {
        console.log('invalid userId or no task found for this selected taskId')
        return res.json({
            message : `invalid userId or no task found for this selected taskId`,
            status : 0 ,
            data : {}
        })
    }

    console.log(`taskIndex : ${taskIndexNo}`)
    const task = tasksList[taskIndexNo]
    console.log(`task : ${task}`)
    task.isCompleted = req.body.isCompleted
    await ReadWriteData.writeTaskData(tasksList)
    res.json({
        message : "Task updated successfully!!" ,
        status : 1 ,
        data : task
    })
    
})

// delete task by user ID and task ID
app.delete('/task/:userId/:taskId' , async (req , res) => {
    const tasksList = await ReadWriteData.readTasksData()
    const taskIndexNo = findIndexById(req.params.userId , req.params.taskId , tasksList)
    if(taskIndexNo === -1) {
        return res.json({
            message : "invalid user id or task id" ,
            status : 0 ,
            data : {}
        })
    }

    const deletedItem = tasksList.splice(taskIndexNo , 1)
    await ReadWriteData.writeTaskData(tasksList)
    console.log(deletedItem)
    res.json({
        message : "task deleted successfully!!" , 
        status : 1 , 
        data : deletedItem[0]
    })
})

const findIndexById = (userId , taskId , dataArray) => dataArray.findIndex(task => 
    task.userId === userId && task.taskId === parseInt(taskId))

module.exports = app    
