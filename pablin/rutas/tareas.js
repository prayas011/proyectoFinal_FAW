const express = require('express');
const router = express.Router();
const Task = require('../modelos/tareas');

router.post('/create', async (req, res) => {
  console.log('Session data:', req.session);
  console.log('Request body:', req.body); 
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { title, priority, description } = req.body;
  const task = new Task({ title, priority, description, createdBy: req.session.userId });
  try {
    await task.save();
    res.status(201).json({ message: 'Tarea creada' });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(400).json({ message: 'Error creating task' });
  }
});


router.get('/all', async (req, res) => {
  console.log('Session data:', req.session);
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const tasks = await Task.find({ createdBy: req.session.userId }).sort({ createdAt: 1 });
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

router.put('/update/:id', async (req, res) => {
  console.log('Session data:', req.session);
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { id } = req.params;
  const { status } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
    res.json(task);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(400).json({ message: 'Error updating task' });
  }
});

router.get('/search', async (req, res) => {
  console.log('Session data:', req.session);
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { query } = req.query;
  try {
    const tasks = await Task.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { priority: { $regex: query, $options: 'i' } }
      ],
      createdBy: req.session.userId
    });
    res.json(tasks);
  } catch (err) {
    console.error('Error searching tasks:', err);
    res.status(500).json({ message: 'Error searching tasks' });
  }
});

module.exports = router;
