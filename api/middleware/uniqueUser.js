const db = require('../../data/dbConfig');

async function uniqueUser (req,res,next) {
    const {username} = req.body;
    const user = await db('users')
        .where('username', username)
        .first();
    if (user) {
        res.status(400).json({message: 'username taken'});
    } else {
        next();
    }
}

module.exports = uniqueUser;