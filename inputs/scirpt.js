// const express = require('express')
// const app = express()
// var bodyParser = require('body-parser')
// app.use(bodyParser.raw({ type: '*/*' }))
// app.post('/', (req, res) => {
//    res.send('You sent: ' + req.body.toString())
// })
// app.listen(3000)

const express = require('express');
const app = express();
const port = 2000;
const bodyParser = require('body-parser');
let webpage = `
<form action="/" method="POST">
<input type="username" name="username" placeholder="username"/>
<input type="password" name="password" placeholder="password"/>
<input type="submit"/>
</form>
`;

app.get('/', (req, res) => res.send(JSON.stringify(req.headers)));
app.use(bodyParser.raw({ type: '*/*' }));
app.post('/', (req, res) => {
  let newOb = JSON.stringify(req.body);
  console.log(JSON.parse(newOb.toString()));
  console.log(JSON.parse(req.body.toString()));
  if (
    req.body.toString().indexOf('username=foo') !== -1 &&
    req.body.toString().indexOf('password=bar') !== -1
  ) {
    console.log(newOb);

    res.send(`Success`);
  } else {
    console.log(newOb);
    res.send('Failure!');
  }
});

app.listen(port, () => {
  console.log(`You're connected! http://localhost:${port}`);
});
