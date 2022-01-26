const express = require("express")
const serverless = require("serverless-http");
const tracker = require('delivery-tracker')

const app = express()
const router = express.Router()

const cors = require("cors")


app.use(cors({
  origin: "*"//"http://localhost:8080"
}), router)
app.use(express.json(),router)
app.use(express.urlencoded({extended: false}),router)

router.get('/', (req, res) => {
  // res.send("Hi Nikki");

  res.json({
    hello: "Nikki welcome here "
  })
})

router.post('/', (req, res) => {
  
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


app.use(`/.netlify/functions/index`, router);

module.exports = app;
module.exports.handler = serverless(app);
// app.listen(5000)