const express = require("express")
const serverless = require("serverless-http");
const tracker = require('../delivery-tracker_mod')
const app = express()
const router = express.Router()
const mongodb = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb')

const cors = require("cors")

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const pwd = encodeURIComponent("Novax2022@")
const uri = "mongodb+srv://nikkiqin120:" + pwd + "@cluster0.o8bsv.mongodb.net/?retryWrites=true&w=majority";
// console.log(uri)

router.get('/', async (req, res) => {
  res.send("Hello Nikki, I'm index.js")

  // const posts = await loadcollection()
  // res.send(await posts.insertOne({ a: "newone" }, func => { }));

})


router.post('/', (req, res) => {
  // console.log(req.body)
  var courier = tracker.courier(req.body.cr)
  courier.trace(req.body.id, (err, result) => {
    if (err) {
      console.log(err)
    }
    else if (result) {
      res.status(201).send(result)
    }
  })
})


async function loadcollection() {
  const client = await mongodb.MongoClient.connect(
    uri, { useNewUrlParser: true }
  );
  return client.db("sample_guides").collection("Cluster0");


}
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


app.use('/.netlify/functions/index', router); //require('../routes/api'));


////*****************Chose one option from below************************/
// 1. serverless in netlify
module.exports = app;
module.exports.handler = serverless(app);

// 2. local debug : npm test
// app.listen(5000, () => console.log("server on 5000"))

