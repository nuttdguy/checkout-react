const express = require('express');
const app = express();



app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


app.post('/', (req, res, next) => {
    console.log('body=', req.body);

    res.send({message: 'hello'});
    next();
});



const port = 3000;
app.listen(port, () => {
    console.log('Server running on port: ', port);
})