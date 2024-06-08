const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: String, required: true, enum: ['ALTA', 'MEDIA', 'BAJA'] },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'ACTIVA', enum: ['ACTIVA', 'FINALIZADA'] }
});

module.exports = mongoose.model('Task', tareaSchema);
