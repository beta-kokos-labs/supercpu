const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Example task pool
let tasks = [{ id: 1, data: 10 }, { id: 2, data: 20 }];
let results = [];

// Endpoint to get a task
app.get('/get-task', (req, res) => {
    if (tasks.length > 0) {
        const task = tasks.pop(); // Get and remove the task from the pool
        res.json(task);
    } else {
        res.status(404).send('No tasks available');
    }
});

// Endpoint to submit results
app.post('/submit-result', (req, res) => {
    results.push(req.body);
    res.send('Result received');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
