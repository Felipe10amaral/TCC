import { hash } from "bcryptjs"
import { IUsersRepository } from "../../contracts/UsersRepository";
import { UserAlreadyExists } from "../Errors/UserAlreadyExists";

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
           throw new UserAlreadyExists()
       }
   
       await this.usersRepository.create({
           email,
           name,
           password: passwordHash
       })
   }
}