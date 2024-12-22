import { FastifyInstance } from 'fastify'
import { register } from '../controller/User/UserController'

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register)
}