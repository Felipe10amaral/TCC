import { Prisma, Professional } from "@prisma/client";

export interface IProfessionalRepository {
    create(data: Prisma.ProfessionalCreateInput): Promise<Professional>
    findByEmail(email: string): Promise<Professional | null>;
    findById(id: number): Promise<Professional | null>;
    findAll(): Promise<Professional[]>;
    //update(id: number, data: Prisma.ProfessionalUpdateInput): Promise<Professional>;
    //delete(id: number): Promise<void>;
}