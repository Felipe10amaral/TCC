import { PrismaUsersRepository } from "../../Repositories/prismaUserRepository";
import { RegisterUseCase } from "../User/UserService";

export function MakeRegisterUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerService = new RegisterUseCase(prismaUsersRepository);

    return registerService;
}