const fileSystem = require('fs')
const fsPro = fileSystem.promises


const readUsersData = async () => {
    const fileData = await fsPro.readFile(`./data/users.json` , 'utf-8') 
    const usersDataToJson = JSON.parse(fileData)
    return usersDataToJson
}

const writeUsersData = async (data) => {
    const dataToString = JSON.stringify(data)
    return fsPro.writeFile('./data/users.json' , dataToString , 'utf-8')
}

const readTasksData = async () => {
    const taskData = await fsPro.readFile('./data/task.json')
    return JSON.parse(taskData)
}

const writeTaskData = async (data) => {
    const taskToString = JSON.stringify(data)
    return fsPro.writeFile('./data/task.json' , taskToString)
}

module.exports = {readUsersData , writeUsersData , readTasksData , writeTaskData}
















// function caller() {
//     console.log("hello world")
// }

// function newFunction() {
//     console.log('new Function')
// }

// // module.exports = newFunction
// // module.exports = caller;

// module.exports = {newFunction , caller}



