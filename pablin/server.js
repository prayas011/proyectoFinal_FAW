const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const logRoutes = require('./rutas/log');
const taskRoutes = require('./rutas/tareas');

const app = express();
const port = 3002;

app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  
}));

app.use(express.json());

app.use(session({
  secret: 'your_secret_key', 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

const dbURI = 'mongodb://127.0.0.1:27017/faw-project';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', logRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
