const express = require('express');
const routerAPI = require('./app/routerAPI')
const {logErrors, errorHandler}=require('./Middlewares/errorHandler');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, my server in express');
});

routerAPI(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(port);
