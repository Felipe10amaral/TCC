import { Service, Prisma } from "@prisma/client";


 export interface IServiceRepository {
  create(data: Prisma.ServiceCreateInput): Promise<Service>;
  findById(id: number): Promise<Service | null>;
  findAll(): Promise<Service[]>;
  findByProfessionalId(professionalId: number): Promise<Service[]>;
  update(id: number, data: Prisma.ServiceUpdateInput): Promise<Service>;
  delete(id: number): Promise<void>;
}

 