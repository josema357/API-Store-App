const express = require('express');
const routerAPI = require('./app/routerAPI')

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, my server in express');
});

routerAPI(app);

app.listen(port);
