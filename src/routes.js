const express = require('express')

const SessionController = require('./controllers/SessionController')
const UserController = require('./controllers/UserController')
const ProfileController = require('./controllers/ProfileController')
const IncidentsController = require('./controllers/IncidentsController')
const routes = express.Router()

routes.post('/sessions', SessionController.create)

routes.get('/users', UserController.list)
routes.post('/users', UserController.create)
// routes.delete('/users/:id', UserController.delete)

routes.get('/profile', ProfileController.specified)

routes.get('/incidents', IncidentsController.list)
routes.post('/incidents', IncidentsController.create)

routes.delete('/incidents/:id', IncidentsController.delete)

module.exports = routes