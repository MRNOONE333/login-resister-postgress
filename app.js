require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // <-- Serve UI

app.use('/api/auth', authRoutes);

app.get('/api/protected', require('./middleware/authMiddleware'), (req, res) => {
  res.json({ message: 'You are authenticated', user: req.user });
});

const PORT = process.env.PORT || 5000;
db.sync()
  .then(() => {
    console.log('DB synced');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to sync DB:', err);
  });

  // require('dotenv').config();
// const express = require('express');
// const authRoutes = require('./routes/authRoutes');
// const sequelize = require('./config/db');

// const app = express();
// app.use(express.json());

// app.use('/api/auth', authRoutes);

// sequelize.sync().then(() => {
//   app.listen(process.env.PORT, () => {
//     console.log(`Server started on port ${process.env.PORT}`);
//   });
// }).catch((err) => {
//   console.error('Failed to sync DB:', err);
// });
