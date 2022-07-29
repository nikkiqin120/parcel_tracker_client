const express = require("express")
const serverless = require("serverless-http");
const tracker = require('../delivery-tracker_mod')
const app = express()
// const router = express.Router()
// const cors = require("cors")

// app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const dbRouter = require('./routes/database')

////***************For debug************/////

// var courier = tracker.courier('ups')
// courier.trace('1Z7F251W2057938184', (err, result) => {
//   // var courier = tracker.courier('fedex')
//   // courier.trace('288369515240', (err) => {
//   // courier.trace('565290578842', (err) => {
//   if (err) {
//     console.log(err)
//   }
//   else if (result) {
//     // res.status(201).send(result)
//     console.log(result)
//   }
// })
/////////////////
app.use('/.netlify/functions/index', dbRouter); //require('../routes/api'));
////*****************Chose one option from below************************/
// 1. serverless in netlify
// module.exports = app;
exports.handler = serverless(app);

// 2. local debug : npm test
// app.listen(5000, () => console.log("server on 5000"))

