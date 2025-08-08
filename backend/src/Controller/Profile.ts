import { FastifyReply, FastifyRequest } from "fastify";

export async function Profile(request: FastifyRequest, response: FastifyReply) {
    await request.jwtVerify()

    return response.status(200).send({ user: request.user })
}