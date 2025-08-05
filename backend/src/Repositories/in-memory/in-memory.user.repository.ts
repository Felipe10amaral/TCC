import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../../Interface/IUsersRepository";

export class InMemoryUserRepository implements IUsersRepository{
    private users: User[] = [];
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: 1,
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone? data.phone : null,
            address: data.address,
            
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        this.users.push(user);
        return user;
    }
    async findEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.email === email);
        if(!user) {
            return null;
        }
        return user;
    }

}