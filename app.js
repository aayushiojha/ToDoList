const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

let tasks = []; // In-memory storage for tasks

app.get('/', (req, res) => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today = new Date();
    let day = today.toLocaleDateString('en-US', options);

    res.render('list', { Todaysday: day, tasks });
});

app.post('/', (req, res) => {
    let newItem = req.body.newItem;
    tasks.push({ name: newItem, completed: false });
    res.redirect('/');
});

app.post('/check', (req, res) => {
    const checkedIndex = req.body.checkedIndex;
    tasks[checkedIndex].completed = !tasks[checkedIndex].completed;
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
