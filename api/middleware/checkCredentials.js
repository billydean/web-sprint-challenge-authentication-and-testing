const {checkUserName} = require('../auth/user-model')

const checkCredentials = async (req, res, next) => {
    try {
        const checked = await checkUserName(req.body.username);
        if (checked) {
            req.user = checked;
            next();
        } else {
            next({
                status: 401,
                message: "invalid credentials"
            })
        }
    } catch (err) {
        next(err);
    }
}
   module.exports = checkCredentials;