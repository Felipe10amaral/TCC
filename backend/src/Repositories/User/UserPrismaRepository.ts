import { Prisma, PrismaClient } from "@prisma/client";
import { IUsersRepository } from "../../contracts/UsersRepository";
import { UsersCreateDTO } from "../../DTOs/Users/UsersCreateDTO";
import { ListUserDTO } from "../../DTOs/Users/ListUserDTO";

export const prisma = new PrismaClient();

export class UserPrismaRepository implements IUsersRepository {
    async findByEmail(email: string){
        const user = await prisma.user.findUnique({
            where: { email }, 
            select: {
                id: true,
                email: true,
                name: true
            }
        })

        return user
    }
    async create(data: UsersCreateDTO) {
        const user = await prisma.user.create({
            data
        })

        return user
    }
}