const bcrypt = require("bcrypt");
const db = require("./database");

const registerUser = (username, password, callback) =>{
    bcrypt.hash(password, 10, (err, hash) =>{
        if (err)  {
            return callback(err);
        }
        db.run(
            "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
            [username, hash, email],
            function (err) {
                if (err) {
                    return callback(err);
                }
                callback(null, {id: this.lastID, username});
            }
        );
    });
};

const loginUser = (username, password, email, callback) => {
    db.get("SELECT * FROM users WHERE username = ? OR email = ?", [username, email], (err, username) => {
        if (err) {
            return callback(err);
        }
        if (!username, !email) {
            return callback(null, false);
        }
        bcrypt.compare(password, username.password, (err, res) => {
            if (res) {
                callback(null, username);
            } else {
                callback(null, false);
            }
        });
    });
};

module.exports = {registerUser, loginUser};