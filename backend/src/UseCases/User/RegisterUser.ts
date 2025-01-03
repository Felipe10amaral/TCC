import { hash } from "bcryptjs"
import { prisma, UserPrismaRepository } from "../../Repositories/User/UserPrismaRepository"
import { IUsersRepository } from "../../contracts/UsersRepository";

interface RegisterUserProps {
    name: string;
    email: string;
    password: string;
}
export class RegisterUser {
    private usersRepository: IUsersRepository;
    
    constructor(usersRepository: IUsersRepository) {
        this.usersRepository = usersRepository
    }

    async execute({email, name, password}: RegisterUserProps) {
       const passwordHash = await hash(password, 6)
   
       const userWithEmail = await this.usersRepository.findByEmail(email)
   
       if(userWithEmail){
           throw new Error('User already exists')
       }
   
       await this.usersRepository.create({
           email,
           name,
           password: passwordHash
       })
   }
}