const conn = require('../database/connection')

module.exports = {
    async login(req, res) {

        const{ id } = req.body

        const data = await conn('ongs')
            .where('id', id)
            .select('nome')
            .first()

        if(!data)
        return res.status(400).json({
            error: 'Conta com Id não encontrado'
        })
        return res.json(data)

    }
}