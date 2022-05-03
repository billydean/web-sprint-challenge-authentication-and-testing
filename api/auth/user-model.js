const db = require('../../data/dbConfig');

function findUser(id) {
    return db('users')
        .where('id', id)
        .select('id', 'username','password')
        .first();
}

async function add(user) {
    const [id] = await db('users')
        .insert(user);
    return findUser(id);
}
module.exports = {
    add,
    findUser
}