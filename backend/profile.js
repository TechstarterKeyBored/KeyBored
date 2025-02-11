const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./profile.db');

exports.getProfile = (req, res) => {
    const userId = req.user.id;
    db.get('SELECT id, username, email FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) {
        return res.status(500).json({ error: 'Fehler beim Abrufen des Profils' });
    }

    if (!row) {
        return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }
    res.status(200).json({
        username: row.username,
        email: row.email,
    });
    });
};

exports.updateProfile = (req, res) => {
const { username, email, password } = req.body;
const userId = req.user.id;


if (!username && !email && !password) {
    return res.status(400).json({ message: 'Mindestens ein Feld muss aktualisiert werden' });
}

let sql = 'UPDATE users SET';
let params = [];
if (username) {
    sql += ' username = ?,';
    params.push(username);
}

if (email) {
    sql += ' email = ?,';
    params.push(email);
}

if (password) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: 'Fehler beim Verschlüsseln des Passworts' });
        }
    
        sql += ' password = ?,';
        params.push(hashedPassword);
    
        sql = sql.slice(0, -1);
        sql += ' WHERE id = ?';
        params.push(userId);

        db.run(sql, params, function (err) {
            if (err) {
            return res.status(500).json({ error: 'Fehler beim Aktualisieren des Profils' });
            }
    
            if (this.changes === 0) {
            return res.status(404).json({ message: 'Benutzer nicht gefunden' });
            }
    
            res.status(200).json({
            message: 'Profil erfolgreich aktualisiert',
            user: { username, email },
        });
    });
});
} else {
sql = sql.slice(0, -1);
sql += ' WHERE id = ?';
params.push(userId);

db.run(sql, params, function (err) {
    if (err) {
        return res.status(500).json({ error: 'Fehler beim Aktualisieren des Profils' });
    }

    if (this.changes === 0) {
        return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    res.status(200).json({
        message: 'Profil erfolgreich aktualisiert',
        user: { username, email },
    });
});
}
};