const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let events = [];
let attendees = [];
let tasks = [];

// Event Management API
app.post('/api/events', (req, res) => {
    const { name, description, location, date } = req.body;
    const id = events.length + 1;
    const event = { id, name, description, location, date };
    events.push(event);
    res.status(201).json(event);
});

app.get('/api/events', (req, res) => {
    res.json(events);
});

app.put('/api/events/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, location, date } = req.body;
    const event = events.find(e => e.id === parseInt(id));

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    event.name = name;
    event.description = description;
    event.location = location;
    event.date = date;

    res.json(event);
});

app.delete('/api/events/:id', (req, res) => {
    const { id } = req.params;
    events = events.filter(e => e.id !== parseInt(id));
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
