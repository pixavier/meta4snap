
const express = require('express');

let port = 8000;
let app = express();

app.use(express.static('.'));

app.listen(port, () => console.log('Server started')); 

