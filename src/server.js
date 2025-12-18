require('dotenv').config();
const app = require('./app');

// 👇 ADD THIS LINE
require('./config/db');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
