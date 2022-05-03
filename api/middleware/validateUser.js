const validateUser = (req, res, next) => {
 if (!req.body.username || req.body.username === undefined || !req.body.password) {
     next({
         status: 400,
         message: 'username and password required'})
 } else {
     next();
 }
}

module.exports = validateUser;