import { prisma } from "./prisma/prisma";
import { IServiceRepository } from "../Interface/IServiceRepository";
import { Service, Prisma } from "@prisma/client";

export class PrismaServiceRepository implements IServiceRepository {
  async create(data: Prisma.ServiceCreateInput): Promise<Service> {
    const service = prisma.service.create({ data }); 
    return service
  }

  async findById(id: number): Promise<Service | null> {
    return prisma.service.findUnique({ where: { id } });
  }

  async findAll(): Promise<Service[]> {
    return prisma.service.findMany({
      include: { professional: true }, // para exibir nome do profissional
    });
  }

  async findByProfessionalId(professionalId: number): Promise<Service[]> {
    return prisma.service.findMany({ where: { professionalId } });
  }

  async update(id: number, data: Prisma.ServiceUpdateInput): Promise<Service> {
    return prisma.service.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await prisma.service.delete({ where: { id } });
  }
}
