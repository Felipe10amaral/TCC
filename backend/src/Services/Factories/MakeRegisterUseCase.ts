import { PrismaUsersRepository } from "../../Repositories/prismaUserRepository";
import { RegisterUseCase } from "../User/UserService";

export function MakeRegisterUseCase() {
    const prismaUsersREpository = new PrismaUsersRepository();
    const registerService = new RegisterUseCase(prismaUsersREpository);

    return registerService;
}