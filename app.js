const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

// Tasks
let tasks = [
    { id: 1, title: "Learn Node.js", completed: false },
    { id: 2, title: "Build REST API", completed: false }
];

// GET all tasks + Query String
app.get("/api/tasks", (req, res) => {
    const { completed } = req.query;

    if (completed === undefined) {
        return res.json(tasks);
    }

    const value = completed === "true";

    res.json(tasks.filter(task => task.completed === value));
});

// GET task by ID
app.get("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json(task);
});

// POST - Add new task
app.post("/api/tasks", (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

// PATCH - Update task
app.patch("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    if (req.body.title !== undefined) {
        task.title = req.body.title;
    }

    if (req.body.completed !== undefined) {
        task.completed = req.body.completed;
    }

    res.json(task);
});

// DELETE - Delete task
app.delete("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const oldLength = tasks.length;

    tasks = tasks.filter(task => task.id !== id);

    if (tasks.length === oldLength) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json({
        message: "Task deleted"
    });
});

// Middleware สำหรับแสดง Log
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});