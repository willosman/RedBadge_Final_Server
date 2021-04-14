const validateAdmin = (req, res, next) => {
    if(req.user.role === 'admin') {
        return next();
    } else {
        return res.status(500).send('You Shall Not Pass!');
    }
};

module.exports = validateAdmin;