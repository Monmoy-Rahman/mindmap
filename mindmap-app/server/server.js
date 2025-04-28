const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/authRoutes');
const mindmapRoutes = require('./routes/mindmapRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: false })); // To parse URL-encoded bodies

app.get('/', (req, res) => {
  res.send('Mind Map App Backend');
});

app.use('/api/users', userRoutes);
app.use('/api/mindmaps', mindmapRoutes);

// Error Handling Middleware
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
