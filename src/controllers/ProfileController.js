
const connection = require('../database/conection')

module.exports = {

    async specified(req, res){
        const user_id = req.headers.authorization

        const incidents = await connection('incidents').where('user_id', user_id).select('*')
    
        return res.json(incidents)
    }
}