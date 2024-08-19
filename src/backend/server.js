const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms');
const reservationsRoutes = require('./routes/reservations');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api/rooms', roomRoutes); 
app.use('/api/reservations', reservationsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
