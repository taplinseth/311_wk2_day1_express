
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const { users } = require('./state')
let counter = users.length + 1

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:userId', (req, res) => {
    let getUser = users.filter(user => user._id === parseInt(req.params.userId));
    res.json(getUser);
});

app.post('/users', (req, res) => {
    users.push(req.body);
    users[users.length-1]._id = counter++;
    res.json(users);
})

app.put('/users/:userId', (req, res) => {
    let getUser = (users.filter(user => user._id === parseInt(req.params.userId)));
    let user = getUser[0];
    user.name = req.body.name ? req.body.name : user.name;
    user.avatar = req.body.avatar ? req.body.avatar : user.avatar;
    user.occupation = req.body.occupation ? req.body.occupation : user.occupation;
    res.json(user);
})

app.delete('/users/:userId', (req, res) => {
    let getUser = (users.filter(user => user._id === parseInt(req.params.userId)));
    let user = getUser[0];
    user.isActive = false;
    res.json('deleted')
})



/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))