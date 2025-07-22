import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../Repositories/prisma";

export async function register (request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        phone: z.string(),
        address: z.string()
    });

    const {name, email, password, address, phone} = registerBodySchema.parse(request.body)

    await prisma.user.create({
        data: {
            name,
            email,
            password,
            address,
            phone
        }
    });
    return reply.status(201).send();

}