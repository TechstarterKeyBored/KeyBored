const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoURI = 'mongodb+srv://typuser:yam6gSEIGrJPBK4B@cluster0.kfmip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB verbunden'))
  .catch(err => console.error('Fehler bei der Verbindung zu MongoDB:', err));

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const bcrypt = require('bcrypt');

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ success: true, message: 'Benutzer erfolgreich registriert' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fehler bei der Registrierung' });
  }
});

const jwt = require('jsonwebtoken');

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id }, 'deinGeheimerSchlüssel', { expiresIn: '1h' });
      res.status(200).json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: 'Ungültige Anmeldedaten' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fehler bei der Anmeldung' });
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Zugriff verweigert' });
  }

  jwt.verify(token, 'deinGeheimerSchlüssel', (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Ungültiges Token' });
    }
    req.user = user;
    next();
  });
};

app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ success: true, message: 'Geschützte Route', user: req.user });
});

app.post('/api/refresh-token', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ success: false, message: 'Refresh-Token fehlt' });
  }

  jwt.verify(refreshToken, 'deinGeheimerSchlüssel', (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Ungültiges Refresh-Token' });
    }

    const newToken = jwt.sign({ userId: user.userId }, 'deinGeheimerSchlüssel', { expiresIn: '1h' });
    res.json({ success: true, token: newToken });
  });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});