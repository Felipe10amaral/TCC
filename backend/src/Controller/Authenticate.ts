import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { InvalidCredentialsError } from "../Errors/Users/InvalidCredentialsErrors";
import { MakeAuthenticateUseCase } from "../Services/Factories/MakeAuthenticateUseCase";

export async function Authenticate (request: FastifyRequest, reply: FastifyReply){
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const {email, password} = authenticateBodySchema.parse(request.body)

    try {
        const authenticateService = MakeAuthenticateUseCase()
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