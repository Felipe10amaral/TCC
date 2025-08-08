import { FastifyInstance } from 'fastify'
import { RegisterUser } from '../Controller/RegisterUser'
import { Authenticate } from '../Controller/Authenticate'
import { RegisterProfessional } from '../Controller/RegisterProfessional'
import { Profile } from '../Controller/Profile'


export async function appRoutes(app: FastifyInstance) {
    app.post('/users', RegisterUser)
    app.post('/sessions', Authenticate)
    app.post('/professionals', RegisterProfessional)

    app.get('/me', Profile)
}