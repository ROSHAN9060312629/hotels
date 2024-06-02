const express = require('express')
const app = express()
app.get('/', function (req, res) {
  res.send('Welcome to Restaurent..')
})
app.get('/milf', function (req, res) {
    var milf={
        thigs:"thick thigs",
        boobs:"bigger than skinny bitches",
        weight:"you cant handle",
    }
    res.send(milf)
})
app.listen(6969,()=>{
    console.log("server is listening..")
})