import {FastifyRequest, FastifyReply} from 'fastify'
import {z} from 'zod'
import {prisma} from '../../Repositories/prisma'
import { hash } from 'bcryptjs'

export async function register (request:FastifyRequest, reply: FastifyReply)  {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {name, email, password} = registerBodySchema.parse(request.body)

    const passwordHash = await hash(password, 6)

    const userWithEmail = await prisma.user.findUnique({
        where: {
            email
        }    
    })

    if(userWithEmail){
        return reply.status(409).send({error: 'Email already exists'})
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password: passwordHash
        }
    })

    return reply.status(201).send()
}