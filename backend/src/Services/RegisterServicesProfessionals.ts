// src/Services/Service/CreateService.ts
import { IServiceRepository } from "../Interface/IServiceRepository";

interface CreateServiceRequest {
  name: string;
  description: string;
  price: number;
  professionalId?: number; // vai vir do JWT futuramente
}

export class CreateService {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute({ name, description, price, professionalId }: CreateServiceRequest) {
    const service = await this.serviceRepository.create({
      name,
      description,
      price,
      professional: { connect: { id: professionalId } },
    });

    return { service };
  }
}
