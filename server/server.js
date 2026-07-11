const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Load environment variables from server/.env
dotenv.config({ path: __dirname + '/.env' });

// Support either env name while keeping the DB connector on MONGO_URI
process.env.MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

// Validate required environment variables
const requiredEnvVars = [
    'MONGO_URI',
    'JWT_SECRET',
    'GROQ_API_KEY'
];

const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
);

if (missingEnvVars.length > 0) {
    console.error(
        `Missing required environment variables: ${missingEnvVars.join(', ')}`
    );
    process.exit(1);
}

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// Root Route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: '🚀 AI Cold Mail Generator API is running',
    });
});

// Health Check Route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
