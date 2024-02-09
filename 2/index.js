var express = require('express');
const Storage = require('node-persist');
var app = express();
var bodyParser = require('body-parser');

const cors = require('cors');
app.use(cors());

var jsonParser = bodyParser.json();

app.get('/getTask', async (req, res) => {
    const task = await Storage.getItem("task") || [];
    res.json(task);
});

app.post('/Task', jsonParser, async (req, res) => {
    const { task_name } = req.body;
    console.log(req.body);
    const task = await Storage.getItem("task") || [];
    task.push(task_name);
    await Storage.setItem("task", task);
    res.send("Task Added Successfully........!")
});


app.listen(5000, async () => {
    await Storage.init()
    await Storage.clear()
    console.log("Server Has Started..!");
});