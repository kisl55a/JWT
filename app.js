const express = require('express');
const jwt = require('jsonwebtoken');

const port = 5000;
const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the club, buddy'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    // const body = req;
    console.log(req)
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Sorry for what?',
                authData,
                // body
            })
        }
    })

})

app.post('/api/login', (req, res) => {
    // User
    const user = {
        id: 1,
        username: 'Dima',
        email: 'd@d'
    }
    jwt.sign({ user }, 'secretkey', { expiresIn: '30s'}, (err, token) => {
        res.json({
            token
        });
    });
})
//FORMAT OF TOKEN
// Authorization: Bearer <access_token>
// Verify token

function verifyToken(req, res, next) {
    // Get auth header value 
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space 
        const bearer = bearerHeader.split(' ');
        // Get token from array 
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        //Forbidden
        res.sendStatus(403);
    }
}

app.listen(port, console.log('Server started on port', port));


