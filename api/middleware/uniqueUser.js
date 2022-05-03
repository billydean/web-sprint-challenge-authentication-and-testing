const User = require('../auth/user-model');
const db = require('../../data/dbConfig');
// const {checkUserName} = User;

async function uniqueUser (req,res,next) {
    const {username} = req.body;
    // if (checkUserName(username)) {
    //     res.status(400).json({message: 'username taken'});
    // } else {
    //     next();
    // }
    const user = await db('users')
        .where('username', username)
        .first();
    if (user) {
        next({status: 400, message: 'username taken'});
    } else {
        next();
    }
}

module.exports = uniqueUser;