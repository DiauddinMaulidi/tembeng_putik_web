const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret-key-yang-sangat-rahasia";

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // ❌ Tidak ada header
    if (!authHeader) {
        return res.status(401).json({ message: "Token tidak tersedia" });
    }

    // Format: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    // ❌ Format salah
    if (!token) {
        return res.status(401).json({ message: "Format token salah" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        // Simpan userId ke request
        req.userId = decoded.id;

        next();
    } catch (err) {
        return res.status(401).json({ message: "Token tidak valid atau kadaluarsa" });
    }
};
