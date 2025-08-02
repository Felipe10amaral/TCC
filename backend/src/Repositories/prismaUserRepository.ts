import { prisma } from "./prisma/prisma";
import { Prisma } from "@prisma/client";
import { IUsersRepository } from "../Interface/IUsersRepository";


export class PrismaUsersRepository implements IUsersRepository{
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