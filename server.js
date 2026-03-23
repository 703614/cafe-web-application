// ============================================================
// BRÜST Cafe — Express + MongoDB Backend
// ============================================================
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
require('dotenv').config();

const app = express();

// ── Middleware ────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:3000',
    process.env.FRONTEND_URL || 'http://localhost:3000'
  ],
  credentials: true,
}));
app.use(express.json());

// ── MongoDB Connection ────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err.message));

// ── Routes ────────────────────────────────────────────────
app.use('/api/menu',    require('./routes/menu'));
app.use('/api/orders',  require('./routes/orders'));
app.use('/api/profile', require('./routes/profile'));

// ── Health check ─────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

// ── Start ─────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
