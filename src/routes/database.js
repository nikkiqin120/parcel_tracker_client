const express = require('express')
const router = express.Router()
const cors = require("cors")

const mongodb = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb')
const mongoose = require('mongoose')
const Blog = require('../models/blog')

router.use(cors({ origin: "*" }))
// origins that are allowed to call the function if it is used outside of netlify team
// const allowedOrigins = [
//     "http://localhost:8081/",
//     "https://mytracker.netlify.app/",
// ];

// // check origin
// var corsOptions = {
//     origin: (origin, callback) => {
//         if (
//             process.env.NETLIFY_DEV === "true" ||
//             allowedOrigins.includes(origin)
//         ) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     optionsSuccessStatus: 200,
// };

// router.use(cors(corsOptions));

const pwd = encodeURIComponent("Novax2022@")
const uri = "mongodb+srv://nikkiqin120:" + pwd + "@ndata.zhcza.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        // console.log("connect to db0")
    })
    .catch(err => console.log(err))

router.get('/', (req, res) => {
    // res.send("This is a root path")
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch(err => console.log(err))
})

router.get('/find', (req, res) => {
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

router.post('/add', (req, res) => {
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

module.exports = router;