import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "../Errors/Users/InvalidCredentialsErrors";
import { IUsersRepository } from "../Repositories/UsersRepository";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest { 
    email: string;
    password: string;
 }

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository: IUsersRepository)    
{}

    async execute({email, password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findEmail(email);

        if(!user) {
            throw new InvalidCredentialsError();
        }

        const isPasswordValid = await compare(password, user.password)

        if(!isPasswordValid) {
            throw new InvalidCredentialsError();
        }

        return {
            user
        }
        
    }
}


