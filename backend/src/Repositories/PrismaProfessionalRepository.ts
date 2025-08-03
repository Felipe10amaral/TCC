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
    async findByEmail(email: string): Promise<Professional | null> {
        const professional = await prisma.professional.findUnique({
            where:{
                email
            }
        })

        return professional;
    }
    findById(id: number): Promise<Professional | null> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Professional[]> {
        throw new Error("Method not implemented.");
    }
    
}