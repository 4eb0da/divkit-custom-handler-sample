const path = require('path');
const express = require('express');
const fetch = require('node-fetch');

const PORT = 3123;
const SECRET = 'ajkgshgjk2hkjggkls';
const RESPONSE = 'All is fine!';
const app = express();

app.use(express.static(path.resolve(__dirname, '../client')));

app.post('/submit-data/', (req, res, next) => {
    fetch(`http://localhost:${PORT}/secret-handler?secret=${SECRET}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Response is not ok');
            }
            return res.json();
        })
        .then(json => {
            res.send({
                ok: 1,
                response: json.response
            });
        })
        .catch(err => {
            console.error(err);
            res.send({
                ok: 0
            });
        });
});

app.get('/secret-handler/', (req, res, next) => {
    setTimeout(() => {
        if (req.query.secret === SECRET) {
            res.send({
                ok: 1,
                response: RESPONSE
            });
        } else {
            res.send({
                ok: 0
            });
        }
    }, 1000);
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/`);
});
