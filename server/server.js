const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const projectRoutes = require('./routes/project.route');
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// Enable CORS for all routes
app.use(cors());

require('dotenv').config();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/project-manager-server')
.then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
    console.log('Database connection failed: ', error);
});

app.use('/api/project', projectRoutes);

app.get('/', (req, res) => {
    res.send('Hello from Node API Server');
});