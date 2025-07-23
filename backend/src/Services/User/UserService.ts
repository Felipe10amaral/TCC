import { hash } from "bcryptjs";
import { prisma } from "../../Repositories/prisma";

interface RegisterServicesRequest {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}

export async function registerService({name, address, email, password, phone} :RegisterServicesRequest) {
    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (userWithSameEmail) {
        throw new Error("User already exists");
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password: passwordHash,
            address,
            phone
        }
    });
}