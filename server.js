// Modules
require('dotenv').config({path: "./config.env"});
const express = require('express');

const connectDb = require('./config/db');
const errorHandler = require('./middleware/error');
// Definations
const app = express();

const PORT = process.env.PORT || 5001;

// DB
connectDb();

// Middleware
app.use(express.json());

app.use("/api/auth", require('./routes/auth'));
app.use("/api/private", require('./routes/private'));
// Error Handler last middleware
app.use(errorHandler);

// Server
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
