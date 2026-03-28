
const jwt = require('jsonwebtoken');

const User = require('../models/User');


const authentication = async (socket, next) => {
    if (!socket.handshake.query || !socket.handshake.query.token) {
        return next(new Error('401'));
    }


    jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return next(new Error(err));
        const user = await User.findById(decoded.id)
        if (!user) return next(new Error('401'));
        socket.user = user;
        next();
    }).catch(next)
}


module.exports = { authentication }