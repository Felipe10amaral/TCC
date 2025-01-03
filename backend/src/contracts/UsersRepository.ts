import { User } from "@prisma/client";
import { ListUserDTO } from "../DTOs/Users/ListUserDTO";
import { UsersCreateDTO } from "../DTOs/Users/UsersCreateDTO";

export interface IUsersRepository {
    create(data: UsersCreateDTO): void
    findByEmail(email: string): Promise<ListUserDTO | null>
}