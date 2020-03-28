const crypto = require('crypto')
const connection = require('../database/conection')


const criptografying = {
    algorithm : "aes-256-ctr",
    secret : "keys",
}


module.exports = {
    async create(req, res){

    const {  email , password } = req.body


        const cipher = crypto.createCipher(criptografying.algorithm, criptografying.secret)
        const crypted = cipher.update(password, 'utf8', 'hex')



    const user = await connection('users')
    .where('email', email )
    .where('cryptedPassword' , crypted)
    .select('id','name')
    .first()
    
    if(!user){
    return res.status(400).json({ error: "No User with this Username"})
        }

        res.json(user)
    }
}