const validateUser = (req, res, next) => {
 if (!req.body.username || !req.body.password) {
     res.status(400).json({message: "username and password required"})
 } else {
     next();
 }
}

module.exports = validateUser;