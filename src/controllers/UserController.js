const crypto = require('crypto')


const connection = require('../database/conection')

const criptografying = {
    algorithm : "aes-256-ctr",
    secret : "keys",
}



module.exports = {
    async create(req, res){
        const {name , password, imgUrlProfile, email , wpp , city , uf} = req.body

        const cipher = crypto.createCipher(criptografying.algorithm, criptografying.secret)
        const crypted = cipher.update(password, 'utf8', 'hex')

        const id  = crypto.randomBytes(4).toString('hex')

        const cryptedPassword = crypted

        await  connection('users').insert({
            id,
            name,
            cryptedPassword,
            imgUrlProfile,
            email,
            wpp,
            city, 
            uf,
        })
    
    
        return res.json({ id , cryptedPassword })
    },

    async list(req, res){

        const user = await connection('users').select('*')

    
        return res.json(user)
    },

    // async delete(req, res){
    //     const {id} = req.params
    //     const user_id = req.headers.authorization
    
    //    const users = await connection('users')
    //    .where('id', id)
    //    .first()
        
    //    if(users.id !== user_id){
    //     return res.status(401).json({ error: "Operation not permitted"})
    //    }
    
    //    await connection('users').where('id', id).delete()
    
    //    return res.status(204).send( )
    //     }
}