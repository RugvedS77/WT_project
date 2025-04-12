require('dotenv').config(); // Ensure this line is at the top of the file
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./mongodb.js');
const authRoutes = require('./routes/authRoutes.js');
const homeRoutes = require('./routes/homeRoutes.js');
const welcomeRoutes = require('./routes/welcomeRoutes.js');
const preferenceRoutes = require('./routes/preferenceRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const accountRoutes = require('./routes/accountRoutes');
const quickStatsRoutes = require('./routes/quickStatsRoutes'); // Import quickStatsRoutes
const postRoutes = require('./routes/postRoutes');
const linkedinRoutes = require('./routes/linkedinRoutes'); // Import linkedinRoutes
const cors = require('cors');
const app = express();

connectDB(); // Ensure the database connection is established

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Increase payload size limit
app.use(bodyParser.json({ limit: '5mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    // Remove or adjust these headers to resolve the issue
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin'); // Change to 'same-origin' or remove
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp'); // Remove if not needed
    next();
});

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

// Authentication routes (e.g., /auth/login, /auth/register)
app.use('/auth', authRoutes);

// Home routes (if you have any under /home)
app.use('/home', homeRoutes);

// Welcome section routes - should be accessible at /api/WelcomeSection
app.use('/api/WelcomeSection', welcomeRoutes); // Ensure this is correctly mounted
// Ensure this route is mounted correctly and does not conflict with other routes

app.use('/api/user', userRoutes);
app.use('/api/preferences', preferenceRoutes);
app.use('/api/accounts', accountRoutes); // Ensure this route is mounted

// Register the quickStats route
app.use('/api/quick-stats', quickStatsRoutes);

// Register post routes
app.use('/api/posts', postRoutes);

// Register LinkedIn routes
app.use('/api/linkedin', linkedinRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}....`);
});