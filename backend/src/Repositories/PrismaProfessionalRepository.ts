import { Prisma, Professional } from "@prisma/client";
import { IProfessionalRepository } from "../Interface/IProfessionalRepository";
import { prisma } from "./prisma/prisma";

export class PrismaProfessionalRepository implements IProfessionalRepository {
    async create(data: Prisma.ProfessionalCreateInput): Promise<Professional> {
        const professional = await prisma.professional.create({
            data
        })

        return professional;
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