const readWriteData = require('./../util/readWriteFile.js')
const TaskDataModel = require('./../model/TaskDataModel.js')


exports.checkTaskBody = (req , res , next) => {
    const reqBody = req.body
    if(!reqBody.userId || !reqBody.tittle) {
        const msg = !reqBody.userId ? "userId required!!" : "proper title required for task!!"
        console.log(msg)
        return res.json({
            message : msg ,
            status : 400
        })
    }
    next()
}

// get task by userID
exports.getTaskById = async (req , res) => {
    const userId = req.params.userId
    console.log(userId)
    const allTasks = await readWriteData.readTasksData()
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
}

// add a task
exports.insertNewTask = async (req , res) => {
    const readTaskFromFile = await readWriteData.readTasksData()
    let taskId = readTaskFromFile.length+1
    const taskReqBody = req.body
    const task = new TaskDataModel(taskId ,taskReqBody.userId , taskReqBody.tittle , taskReqBody.createdTime , taskReqBody.reminderTime , taskReqBody.isCompleted)
    readTaskFromFile.push(task)
    console.log(readTaskFromFile)
    await readWriteData.writeTaskData(readTaskFromFile)
    res.json({
        message : "Task created successfully" ,
        status : 1 ,
        data : task
    })
}

// update task by userId
exports.updateTaskById = async (req , res) => {
    const tasksList = await readWriteData.readTasksData()
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
    await readWriteData.writeTaskData(tasksList)
    res.json({
        message : "Task updated successfully!!" ,
        status : 1 ,
        data : task
    })
}

exports.deleteTask = async (req , res) => {
    const tasksList = await readWriteData.readTasksData()
    const taskIndexNo = findIndexById(req.params.userId , req.params.taskId , tasksList)
    if(taskIndexNo === -1) {
        return res.json({
            message : "invalid user id or task id" ,
            status : 0 ,
            data : {}
        })
    }

    const deletedItem = tasksList.splice(taskIndexNo , 1)
    await readWriteData.writeTaskData(tasksList)
    console.log(deletedItem)
    res.json({
        message : "task deleted successfully!!" , 
        status : 1 , 
        data : deletedItem[0]
    })
}

const findIndexById = (userId , taskId , dataArray) => dataArray.findIndex(task => 
    task.userId === userId && task.taskId === parseInt(taskId))