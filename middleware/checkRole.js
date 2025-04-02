// Middleware to check user roles
module.exports = function checkRole(role) {
    return (req, res, next) => {
        // if (1) { hebit ntester brk 
        if(req.user && req.user.role === role){
            next();
        } else {
            res.status(403).json({ message: 'Access defined' });
        }
    };
};