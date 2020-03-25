const connection = require('../database/conection')

module.exports = {
    async create(req, res){
    const { id } = req.body

    const user = await connection('users')
    .where('id', id)
    .select('name')
    .first()
    
    if(!user){
    return res.status(400).json({ error: "No User with this Username"})
        }

        res.json(user)
    }
}