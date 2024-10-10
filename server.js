const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();


connectDB();

const app = express();

app.use(express.json());
app.use(cors());


app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admins', require('./routes/adminRoutes'));

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ msg: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
