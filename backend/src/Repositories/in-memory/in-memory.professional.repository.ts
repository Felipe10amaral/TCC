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
    async findByEmail(email: string): Promise<Professional | null> {
        const professional = this.professionals.find(user => user.email === email);
        if(!professional) {
            return null;
        }
        return professional;
    }
    
    async findById(id: number): Promise<Professional | null> {
        return null
    }
    async findAll(): Promise<Professional[]> {
        return this.professionals
    }

}