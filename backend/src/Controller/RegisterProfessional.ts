import {FastifyRequest, FastifyReply} from 'fastify'
import { z } from 'zod';
import { MakeRegisterProfessionalUseCase } from '../Services/Factories/MakeRegisterProfessionalUseCase';
import { ProfessionalAlreadyExistsError } from '../Errors/Professional/ProfessionaAlreadyExists';

export async function RegisterProfessional(request: FastifyRequest, response: FastifyReply) {
    const registerBodySchema = z.object({ 
        name: z.string(),
        email: z.string(),
        password: z.string(),
        adress: z.string(),
        phone: z.string()
    });

    const { name, email, password, adress, phone } = registerBodySchema.parse(request.body);

    try {
        const registerService = MakeRegisterProfessionalUseCase();
        await registerService.execute({ name, email, password, adress, phone });
    } catch (error) {
        if (error instanceof ProfessionalAlreadyExistsError) {
            return response.status(409).send({
                message: error.message
            });
        }
        throw error;
    }

    return response.status(201).send();
}