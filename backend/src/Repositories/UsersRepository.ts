import { Prisma, User } from ".prisma/client";

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>;
    findEmail(email: string): Promise<User | null>;
}