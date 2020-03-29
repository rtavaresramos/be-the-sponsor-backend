
const connection = require('../database/conection')

module.exports = {
    
    async list(req, res){
        const { page = 1} = req.query

        const [count] = await connection('incidents').count()

        const incidents = await connection('incidents')
        .join('users', 'users.id', '=', 'incidents.user_id')
        .limit(5)
        .offset((page -1) * 5)
        .select([
            'incidents.*',
            'users.name',
            'users.email',
            'users.wpp',
            'users.city',
            'users.uf'
        ])
    
        res.header('X-Total-Count', count['count(*)'])
        return res.json(incidents)
    },
    
    
    async create(req, res){

        const {title , description , value , motivation , url} = req.body
        const user_id = req.headers.authorization
        const user_name = req.headers.name
       const [id] = await  connection('incidents').insert({
           user_name,
           title,
           description,
           motivation,
           url,
           value,
           user_id
        })
    
    
        return res.json({ id })
    },

    
    async delete(req, res){
    const {id} = req.params
    const user_id = req.headers.authorization

   const incidents = await connection('incidents')
   .where('id', id)
   .select('user_id')
   .first()
    
   if(incidents.user_id !== user_id){
    return res.status(401).json({ error: "Operation not permitted"})
   }

   await connection('incidents').where('id', id).delete()

   return res.status(204).send( )
    }
}