import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { AuthenticateUseCase } from "../Services/AuthenticateSevice";
import { PrismaUsersRepository } from "../Repositories/prismaUserRepository";
import { InvalidCredentialsError } from "../Errors/Users/InvalidCredentialsErrors";

export async function Authenticate (request: FastifyRequest, reply: FastifyReply){
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const {email, password} = authenticateBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository();
        const authenticateService = new AuthenticateUseCase(prismaUsersRepository);
        
        await authenticateService.execute({ email, password });
    
    } catch (error) {
        if(error instanceof InvalidCredentialsError) {
            return reply.status(400).send({
                message: error.message
            });
        }
        throw error
    }

    
    return reply.status(204).send();

}