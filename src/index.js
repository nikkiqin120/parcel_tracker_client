const express = require("express")
const serverless = require("serverless-http");

const app = express()
const router = express.Router()

// const cors = require("cors")

// app.use(cors({origin: "*"}))
// app.use(express.json())
// app.use(express.urlencoded({extended: false}))

router.get('/', (req,res)=>{
  // console.log("app entry test")
  res.send("Hello Nikki")
})

app.use('/.netlify/functions/index', router);//require('./routes/api'));

module.exports = app;
module.exports.handler = serverless(app);
// app.listen(5000, () => console.log("server on 5000"))