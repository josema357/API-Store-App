const express = require('express');
const routerAPI = require('./app/routerAPI')
const {logErrors, errorHandler}=require('./Middlewares/errorHandler');
const {boomErrorHandler}=require('./Middlewares/boomErrorHandler');
require('dotenv').config()
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

//CORS configuration
const whiteListString=process.env.WHITELIST || 'http://localhost:4000';
const whiteList = whiteListString.split(",");
const options={
  origin:(origin, callback)=>{
    if(whiteList.includes(origin) || !origin){
      callback(null, true);
    }else{
      callback(new Error('Not Allowed by CORS'), false)
    }
  }
}
app.use(cors(options));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, my server in express');
});

routerAPI(app);

//Middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port);
