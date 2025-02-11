const express = require('express');
const bodyParser = require('body-parser');
const profileRoutes = require('./routes/profile');
const authMiddleware = require('./middleware/auth');

const app = express();
app.use(bodyParser.json());

app.use('/api', profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server läuft auf Port ${PORT}`);
});