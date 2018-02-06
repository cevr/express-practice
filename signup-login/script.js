const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

const port = 3000;

let signupPage = `
<form method="POST" action="/signup">
<input name="username" type="username" placeholder="username" require/>
<input name="password" type="password" placeholder="password" require/>
<button>Signup</button>
</form>
`;
let loginPage = `
<form method="POST" action="/login">
<input name="username" type="username" placeholder="username" require/>
<input name="password" type="password" placeholder="password" require/>
<button>Login</button>
</form>
<p>Don't have an account?<a href="http://10.65.104.176:3000/signup"> Sign up</a></p>
`;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   res.redirect(`login`);
});

app.get('/signup', (req, res) => {
   res.send(signupPage);
});
app.get('/login', (req, res) => {
   res.send(loginPage);
});

app.post();

app.listen(port, () => {
   console.log(`You are connected! http://localhost:${port}`);
});
