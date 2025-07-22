import { FastifyInstance } from 'fastify'
import { register } from '../Controller/User'


export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register)
}