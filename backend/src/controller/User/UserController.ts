import {FastifyRequest, FastifyReply} from 'fastify'
import {z} from 'zod'
import { RegisterUser } from '../../UseCases/User/RegisterUser'
import { UserPrismaRepository } from '../../Repositories/User/UserPrismaRepository'

export async function register (request:FastifyRequest, reply: FastifyReply)  {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {name, email, password} = registerBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new UserPrismaRepository()
        const registerUser = new RegisterUser(prismaUsersRepository)

        await registerUser.execute({name, email, password})
    } catch (error: any) {
        return reply.status(409).send({error: error.message})
    }

    return reply.status(201).send()
}