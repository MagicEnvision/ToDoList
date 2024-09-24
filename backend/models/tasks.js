const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title:{
    type: String
  },
  description:{
    type: String
  }
})

module.exports = mongoose.model("TaskModel", taskSchema) 