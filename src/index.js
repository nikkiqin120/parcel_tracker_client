const express = require("express")
const serverless = require("serverless-http");
const tracker = require('../delivery-tracker_mod')
const app = express()
const router = express.Router()
const mongodb = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const cors = require("cors")

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const pwd = encodeURIComponent("Novax2022@")
const uri = "mongodb+srv://nikkiqin120:" + pwd + "@ndata.zhcza.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    // console.log("connect to db0")
  })
  .catch(err => console.log(err))

router.get('/find', cors(), (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result)
    })
    .catch(err => console.log(err))
})

router.get('/deleteall', async (req, res) => {
  Blog.deleteMany()
    .then(result => console.log("delete all: " + result))
    .catch(err => console.log(err))
})

router.post('/add', cors(), (req, res) => {
  const item = req.body.data
  const blog = new Blog(item)

  blog.save()
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

router.post('/delete', async (req, res) => {
  Blog.deleteOne({ tracknumber: req.body.data.tracknumber })
    .then(result => console.log("delete CR: " + JSON.stringify(result)))
    .catch(err => console.log(err))
  // }
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

