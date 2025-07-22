import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../Repositories/prisma";
import { hash } from "bcryptjs";

export async function register (request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        phone: z.string(),
        address: z.string()
    });

    const {name, email, password, address, phone} = registerBodySchema.parse(request.body)

    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (userWithSameEmail) {
        return reply.status(409).send({ message: "User already exists" });
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password: passwordHash,
            address,
            phone
        }
    });
    return reply.status(201).send();

}