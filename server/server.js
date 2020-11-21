const express = require('express'); 
const bodyParser = require('body-parser'); 
const app = express(); 
app.use(bodyParser.urlencoded({extended: true}));
const router = require('./routes/list.routes.js')

app.use( express.static('server/public')); 

app.use('/list',router);

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log('listening on port', port);
});
