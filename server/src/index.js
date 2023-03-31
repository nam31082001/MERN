const express = require('express')
const app = express()
const  bodyParser = require("body-parser");
const route=require('./router/index')
const db=require('./modes/database')
const cors = require('cors');
const port = 5000;


app.use(cors());
db.connect()
app.use(bodyParser.urlencoded(
  {extended:false}
))
app.use(express.json())

route(app)
app.listen(port,()=>{
  console.log(`Example app listening at http://localhost:${port}`)
})