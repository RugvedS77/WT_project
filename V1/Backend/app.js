const express = require('express')
const connectDB = require('./mongodb')
const authRoutes = require('./authRoutes')
const homeRoutes = require('./HomeRoute')
const cors = require('cors')
const app = express()
require('dotenv').config();

connectDB();

app.use(cors({
    origin: 'http://localhost:5173', // React's default port
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',authRoutes);
app.use('/home', homeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}....`)
})

