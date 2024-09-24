const SERVER_PORT = 3001
const cors = require('cors')
const express = require('express')
const TaskModel = require('./models/tasks')
const mongoose = require('mongoose')
const app = express()

app.use(cors())
app.use(express.json());

const DB_CONNECTION_STRING = "mongodb+srv://admin:admin@cluster0.ktjqy7e.mongodb.net/TASKS?retryWrites=true&w=majority&appName=Cluster0"


app.listen(SERVER_PORT, ()=>{

  try{
    mongoose.connect(DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("Connected!")
    
  }
  catch(err){
    console.log(err)
  }
  console.log(`Server is live on port ${SERVER_PORT}`)
})



app.get('/', async (req, res) => {
    try {
      const taskList = await TaskModel.find()
      res.status(200).send(taskList)
    } catch (error) { 
      res.status(404).send(error)
    }
})
app.post('/add', async (req, res) => {
  try {
    const newTask = new TaskModel({
      title: req.body.title,
      description: req.body.description
    })
    await newTask.save()
    res.status(201).send(`${newTask.title} was added`)
  } catch (error) {
    res.status(404).send(error)
  }
})
app.put('/update', (req, res) => {

})
app.delete('/delete', (req, res) => {

})