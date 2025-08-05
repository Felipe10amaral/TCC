import { Prisma, Professional } from "@prisma/client";
import { IProfessionalRepository } from "../../Interface/IProfessionalRepository";

export class InMemoruProfessionalRepository implements IProfessionalRepository {
    private  professionals: Professional[] = []
    async create(data: Prisma.ProfessionalCreateInput): Promise<Professional> {
        const professional = {
            id: 1,
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone? data.phone : null,
            adress: data.adress,
            
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        this.professionals.push(professional)

        return professional
    }
    findByEmail(email: string): Promise<Professional | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Professional | null> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Professional[]> {
        throw new Error("Method not implemented.");
    }

}