const SERVER_PORT = 3001
const cors = require('cors')
const express = require('express')


const app = express()


app.listen(SERVER_PORT, ()=>{
  console.log(`Server is live on port ${SERVER_PORT}`)
})



app.get('/add', (req, res) => {
  res.send("Hi")
})
app.post('/post', (req, res) => {

})
app.put('/update', (req, res) => {

})
app.delete('/delete', (req, res) => {

})