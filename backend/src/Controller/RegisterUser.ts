import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "../Errors/Users/UserAlreadExists";
import { MakeRegisterUseCase } from "../Services/Factories/MakeRegisterUseCase";

export async function RegisterUser (request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        phone: z.string(),
        address: z.string()
    });

    const {name, email, password, address, phone} = registerBodySchema.parse(request.body)

    try {
        const registerService = MakeRegisterUseCase()
        await registerService.execute({ name, email, password, address, phone });
    
    } catch (error) {
        if(error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({
                message: error.message
            });
        }
        throw error
    }

    
    return reply.status(201).send();

}