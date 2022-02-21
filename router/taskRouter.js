const express = require('express')
const taskController = require('./../controller/TaskController')
const router = express.Router()

router.route('/').post(taskController.insertNewTask)

router.route('/:userId').get(taskController.getTaskById)

router.route('/:userId/:taskId')
    .patch(taskController.updateTaskById)
    .delete(taskController.deleteTask)

module.exports = router