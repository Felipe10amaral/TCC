import { hash } from "bcryptjs";
import { UsersRepository } from "../../Repositories/UsersRepository";


interface RegisterServicesRequest {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}
export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, password, address, phone }: RegisterServicesRequest) {
        const passwordHash = await hash(password, 6);

        const userWithSameEmail = await this.usersRepository.findEmail(email);

        if(userWithSameEmail) {
            throw new Error("User already exists");
         }

        const user = await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            address,
            phone
        });

        return user;
    }
}