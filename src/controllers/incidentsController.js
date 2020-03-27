const conn = require('../database/connection')
const crypto = require('crypto')

module.exports = {

    async createIncidents(req, res) {

        const { title, description, value } = req.body

        const ong_id = req.headers.authorization

        const [id] = await conn('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return res.json({ id })
    },

    async getAll(req, res) {

        const { page = 1 } = req.query

        const [count] = await conn('incidents').count()

        const incidents = await conn('incidents as i')
            .join('ongs as o','o.id', '=', 'i.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['i.*', 'o.nome, o.whatsapp, o.city, o.uf'])

        res.header('X-Total-Count', count['count(*)'])
        return res.json(incidents)


    },
    async delete(req, res) {
        const { id } = req.params
        const ong_id = req.headers.authorization

        const incident = await conn('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

        console.log(incident.ong_id);


        if (incident.ong_id !== ong_id) {
            return res.status(401).json({
                error: "Não permitido"
            })
        }
        await conn('incidents').where('id', id).delete()

        return res.status(204).send()
        //await conn('incidents').delete().where()
    }
}