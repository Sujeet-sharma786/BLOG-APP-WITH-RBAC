require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');
const blogRoutes = require('./routes/blogRoutes.js')
const bookRoutes = require('./routes/bookRoutes.js')
const app = express();
const path = require('path')

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));
// Routes
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/api/users', userRoutes);
app.use('/api/blogs',blogRoutes)

app.use('/api/authors',bookRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
