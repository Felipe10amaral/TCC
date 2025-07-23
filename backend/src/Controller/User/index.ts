import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUseCase } from "../../Services/User/UserService";
import { PrismaUsersRepository } from "../../Repositories/prismaUserRepository";

export async function register (request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        phone: z.string(),
        address: z.string()
    });

    const {name, email, password, address, phone} = registerBodySchema.parse(request.body)

    try {
        const prismaUsersREpository = new PrismaUsersRepository();
        const registerService = new RegisterUseCase(prismaUsersREpository);
        await registerService.execute({ name, email, password, address, phone });
    
    } catch (error) {
        return reply.status(409).send({
            message: "User already exists" 
        })
    }

    
    return reply.status(201).send();

}