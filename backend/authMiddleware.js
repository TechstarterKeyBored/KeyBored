const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: "Zugang verweigert"});
    }
    try{
        const decoded = jwt.verify(token, "geheimerSchluessel");
        req.user = { id: decoded.userID};
        next();
    } catch (error) {
        res.status(403).json({ message: "Ungültiger oder abgelaufener Token"});
    }
};

module.exports = authMiddleware;