const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const routes = require('./routes');

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});