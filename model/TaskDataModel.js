module.exports = class TaskDataModel {
  constructor(taskId, userId, tittle, createdTime, reminderTime, isCompleted) {
    this.taskId = taskId;
    this.userId = userId;
    this.tittle = tittle;
    this.createdTime = createdTime;
    this.reminderTime = reminderTime;
    this.isCompleted = isCompleted;
  }

  printTaskDetails() {
    console.log(
      this.userName,
      this.createdTime,
      this.reminderTime,
      this.isCompleted
    );
  }
};
