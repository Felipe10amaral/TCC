import { prisma } from "./prisma/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "./UsersRepository";


export class PrismaUsersRepository implements UsersRepository{
    async create(data: Prisma.UserCreateInput) {
       const user = await prisma.user.create({
            data
            
        });
        return user;
    }

    async findEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }
}