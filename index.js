const express = require("express")
const serverless = require("serverless-http");
const app = express()
const cors = require("cors")

app.use(cors({origin: "*"}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req,res)=>{
  console.log("app entry test")
})

app.use('/.netlify/functions/index', require('./routes/api'));
// app.use('/api', require('./routes/api'))

module.exports = app;
module.exports.handler = serverless(app);
// app.listen(5000, () => console.log("server on 5000"))