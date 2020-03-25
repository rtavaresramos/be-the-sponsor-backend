const crypto = require('crypto')
const connection = require('../database/conection')

module.exports = {
    async create(req, res){
        const {name , email , wpp , city , uf} = req.body

        const id  = crypto.randomBytes(4).toString('hex')
    
        await  connection('users').insert({
            id,
            name,
            email,
            wpp,
            city,
            uf,
        })
    
    
        return res.json({ id })
    },

    async list(req, res){

        const user = await connection('users').select('*')
    
        return res.json(user)
    }
}