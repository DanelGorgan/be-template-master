const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    })
}

function checkAdminRights(req, res, next) {
    if (req.user?.role !== 'admin') {
        return res.sendStatus(401);
    }
    next();
}

module.exports = {
    authenticateToken,
    checkAdminRights
}