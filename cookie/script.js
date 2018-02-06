const express = require('express');
const app = express();
const fs = require('fs');
const assert = require('assert');
const bodyParser = require('body-parser');

const port = 2000;

const test = func => {
    let inputs = ['foo=bar'];
    let outputs = [{ foo: 'bar' }];

    for (let i = 0; i < inputs.length; i++) {
        if (assert.deepEqual(func(inputs[i]), outputs[i])) {
            throw new Error('Failed test #' + i);
        }
    }
};

const parseCookies = str => {
    let asArray = str.split('; ').map(x => x.split('='));
    let ret = {};
    asArray.forEach(lst => (ret[lst[0]] = lst[1]));
    return ret;
};

function genRand() {
    return Math.floor(Math.random() * 100000000);
}

let map = {};

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    if (req.headers.cookie) {
        let cookies = parseCookies(req.headers.cookie);
        map[cookies.SessionID] = 0;

        if (cookies.SessionID) {
            try {
                map = JSON.parse(fs.readFileSync('./data.txt'));
            } catch (err) {
                console.log(err);
            }

            map[cookies.SessionID] =
                map[cookies.SessionID] == undefined
                    ? 1
                    : (map[cookies.SessionID] += 1);

            fs.writeFileSync(`./data.txt`, JSON.stringify(map));

            res.send(
                `You have visited here before. Times:${map[cookies.SessionID]}`
            );
            return;
        }
    }
    res.set('Set-Cookie', `SessionID = ${genRand()}`);
    res.send(JSON.stringify(req.headers));
});

app.listen(port, () =>
    console.log(`You're connected! https://localhost:${port}`)
);
