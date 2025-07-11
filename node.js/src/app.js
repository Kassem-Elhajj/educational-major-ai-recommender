const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express();

const sequelize = require('./config/sequelize');

require('dotenv').config()

const corsOptions ={
    origin : 'http://localhost:4200',
    credentials: true,                 // ✅ needed to send cookies
    optionsSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser());

const UserRoute = require('./routes/UserRoute');
app.use('/users', UserRoute)

const RecommendationRoute = require('./routes/Recommendation');
app.use('/recommendations', RecommendationRoute);

// Test DB connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL connection established via Sequelize');
    return sequelize.sync(); 
  })
  .then(() => {
    console.log('✅ All models synced');
  })
  .catch((err) => {
    console.error('❌ Sequelize connection failed:', err);
  });


module.exports = app;
