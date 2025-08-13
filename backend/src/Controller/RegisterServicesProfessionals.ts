// src/Controllers/CreateServiceController.ts
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { MakeCreateServiceUseCase } from "../Services/Factories/MakeRegisterServices";

export async function CreateServiceController(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    professionalId: z.number() // por enquanto via body, depois do JWT
  });

  const { name, description, price, professionalId } = bodySchema.parse(request.body);

  const createServiceUseCase = MakeCreateServiceUseCase();
  const { service } = await createServiceUseCase.execute({
    name,
    description,
    price,
    professionalId,
  });

  return reply.status(201).send(service);
}
