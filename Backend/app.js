require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./mongodb.js');
const authRoutes = require('./routes/authRoutes.js');
const homeRoutes = require('./routes/homeRoutes.js');
const welcomeRoutes = require('./routes/welcomeRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const accountRoutes = require('./routes/accountRoutes');
const quickStatsRoutes = require('./routes/quickStatsRoutes');
const postRoutes = require('./routes/postRoutes');
const linkedinRoutes = require('./routes/linkedinRoutes');
const preferenceRoutes = require('./routes/preferenceRoutes');
const draftRoutes = require('./routes/draftRoutes');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors({
    origin: ['http://localhost:5173', 'https://www.linkedin.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/auth', authRoutes);
app.use('/home', homeRoutes);
app.use('/api/WelcomeSection', welcomeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/preferences', preferenceRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/quick-stats', quickStatsRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/linkedin', linkedinRoutes);
app.use('/api/drafts', draftRoutes);

// const path = require('path');
// // Serve frontend at /social-scheduler
// app.use('/social-scheduler', express.static(path.join(__dirname, '../social-scheduler/dist')));

// // Support SPA routing under /social-scheduler
// app.get('/social-scheduler/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../social-scheduler/dist/index.html'));
// });


// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}....`);
});