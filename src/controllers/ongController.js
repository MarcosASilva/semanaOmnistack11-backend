const conn = require('../database/connection')
const crypto = require('crypto')

module.exports = {

    async createOng(req, res) {
        const { nome, email, whatsapp, city, uf } = req.body

        const id = crypto.randomBytes(4).toString("HEX");

        await conn('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            city,
            uf
        })

        return res.json({
            id: id
        })
    },

    async getAll(req, res) {


        const data = await conn('ongs').select('*')

        return res.json(data)


    }
}