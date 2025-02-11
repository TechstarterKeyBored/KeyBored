const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./game.db", (err) => {
    if (err) {
        console.error("Fehler beim Öffnen der Datenbank:", err.message);
    } else{
        console.log("Erfolgreich Verbunden.")
    }
});

db.serialize(() =>{
    db.run(
        `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
    )`
);

db.run(
    `CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    users_id INTEGER,
    score INTEGER NOT NULL,
    FOREIGN KEY (user_ID) REFERENCES user(id)
    )`
);
});
module.exports = db;