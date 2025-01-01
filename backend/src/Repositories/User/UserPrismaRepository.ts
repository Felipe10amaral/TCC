import { Prisma, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export class UserPrismaRepository {
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })

        return user
    }
}