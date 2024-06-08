const express = require('express');
const router = express.Router();
const User = require('../modelos/usuario');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  try {
    await user.save();
    res.status(201).json({ message: 'usuario creado' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(400).json({ message: 'Error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'correo incorrecto' });
    }
    const isValid = user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ message: 'contraseña incorrecta' });
    }
    req.session.userId = user._id;
    res.json({ message: 'logueado' });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Error' });
  }
});

module.exports = router;
