import { hash } from "bcryptjs"
import { prisma, UserPrismaRepository } from "../../Repositories/User/UserPrismaRepository"

interface RegisterUserProps {
    name: string;
    email: string;
    password: string;
}
export async function RegisterUser({email, name, password}: RegisterUserProps) {
    const passwordHash = await hash(password, 6)

    const userWithEmail = await prisma.user.findUnique({
        where: {
            email
        }    
    })

    if(userWithEmail){
        throw new Error('User already exists')
    }

    const prismaUserRepository = new UserPrismaRepository()

    await prismaUserRepository.create({
        email,
        name,
        password: passwordHash
    })
}