import { FastifyInstance } from 'fastify'
import { register } from '../Controller/User'
import { Authenticate } from '../Controller/Authenticate'


export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/sessions', Authenticate)
}