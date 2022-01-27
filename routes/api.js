const express = require("express")
const tracker = require('delivery-tracker')
const router = express.Router()

router.get('/', (req, res) => {
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

module.exports = router;