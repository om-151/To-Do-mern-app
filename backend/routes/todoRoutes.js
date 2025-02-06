const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// Create a new todo
router.post("/", async (req, res) => {
    const { user, title, description } = req.body;

    if (!user || !title || !description) {
        return res.status(400).json({ message: "User ID, title, and description are required" });
    }

    try {
        const todo = new Todo({ user, title, description });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Get all todos for a user
router.get("/:userId", async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.params.userId });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Update a todo (mark as completed, edit title or description)
router.put("/:todoId", async (req, res) => {
    const { title, description, completed } = req.body;

    try {
        const todo = await Todo.findById(req.params.todoId);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        if (title !== undefined) todo.title = title;
        if (description !== undefined) todo.description = description;
        if (completed !== undefined) todo.completed = completed;

        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Delete a todo
router.delete("/:todoId", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.todoId);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        await todo.deleteOne();
        res.json({ message: "Todo deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
