const express  = require('express');
const mongoose = require('mongoose');
const  dotenv  = require('dotenv');
const { log } = require('console');
dotenv.config()
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// connect to mongoDB

mongoose.connect(process.env.URI).then(() => log('connected to mongoDB'))
.catch((err) => console.log(err));

// Routes

// GET: Return users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: Add a new user to the database
app.post('/users', async (req, res) => {
    const user = new User({
        name: req.body.name,
        age: req.body.age,
        favoriteFoods: req.body.favoriteFoods
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT: Edit a user
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Delete a User
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
