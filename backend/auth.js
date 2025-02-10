const bcrypt = require("bcrypt");
const db = require("./database");

const registerUser = (username, password, callback) =>{
    bcrypt.hash(password, 10, (err, hash) =>{
        if (err)  {
            return callback(err);
        }
        db.run(
            "INSERT INTO users (username, passwprd) VALUES (?, ?)",
            [username, hash],
            function (err) {
                if (err) {
                    return callback(err);
                }
                callback(null, {id: this.lastID, username});
            }
        );
    });
};

const loginUser = (username, password, callback) => {
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if (err) {
            return callback(err);
        }
        if (!user) {
            return callback(null, false);
        }
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
                callback(null, user);
            } else {
                callback(null, false);
            }
        });
    });
};

module.exports = {registerUser, loginUser};