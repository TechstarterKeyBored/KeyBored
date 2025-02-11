const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authoriation?.split('')[1];
    if (!token) {
        return res.status(403).json({ message: "Zugang verweigert"});
    }
    try{
        const decoded = jwt.verify(token);
        req.user = { id: decoded.userID};
        next();
    } catch (error) {
        res.status(403).json({ message: "Untüliger oder abgelaufener Token"});
    }
};

module.exports = authMiddleware;