const express = require('express')
const crypto = require('crypto')
const ongController = require('./controllers/ongController')
const incidentsController = require('./controllers/incidentsController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const conn = require('./database/connection')

const routes = express.Router()

/**
 * Rotas de Sessão
 */

routes.post('/sessions', SessionController.login)


/**
 * Rotas de Ongs
 */

routes.post('/ongs', ongController.createOng)
routes.get('/ongs', ongController.getAll)
routes.get('/incidentsByOng', ProfileController.index)

/**
 * Rotas de Casos
 */

routes.post('/incidents', incidentsController.createIncidents)
routes.get('/incidents', incidentsController.getAll)
routes.delete('/incidents/:id', incidentsController.delete)

module.exports = routes