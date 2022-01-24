const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors({
    origin:"*"//"http://localhost:8080"
}))



var tracker = require('delivery-tracker')
var courier = tracker.courier("ups")
var trace_number = "1Z9Y27V42063168543"


courier.trace(trace_number, function (err, result) {
//   console.log(JSON.stringify(result))
    let path="/" + trace_number;
  app.get(path, (req, res) => {
    res.send(result)
})
})

app.listen(5000)