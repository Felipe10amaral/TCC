import { PrismaUsersRepository } from "../../Repositories/prismaUserRepository";
import { AuthenticateUseCase } from "../AuthenticateSevice";

export function MakeAuthenticateUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const authenticateService = new AuthenticateUseCase(prismaUsersRepository);

    return authenticateService;
}