const express = require("express")
const app = express()
const router = express.Router()

const cors = require("cors")
app.use(cors({
  origin: "*"//"http://localhost:8080"
}))

var tracker = require('delivery-tracker')


// app.get('/', (req,res)=>{
//   console.log("router get")
//   res.send(req.body)
// })

// app.get('/', (req, res) => {
//   // res.sendStatus(200)
//   // res.status(201).send("hi this ism e")
//   res.json({message : "download"});
//   // res.download("index.js")
//   // res.send("req")
// })

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.post('/', (req, res) => {

  // console.log(req.body)
  var courier = tracker.courier(req.body.cr)
  courier.trace(req.body.id, (err, result) => {
      if(err){
        console.log(err)
      }
      else if (result){
        res.status(201).send(result)
      }
  })

})


app.listen(5000)