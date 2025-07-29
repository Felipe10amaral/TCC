import { expect, test, describe, it } from 'vitest'
import { RegisterUseCase } from './UserService';
import { compare } from 'bcryptjs';
import { InMemoryUserRepository } from '../../Repositories/in-memory/in-memory.user.repository';
import { UserAlreadyExistsError } from '../../Errors/Users/UserAlreadExists';

describe('Register UseCase', () => {

    it('should be able to register a new user', async () => {
        const userRepository = new InMemoryUserRepository();
        const registerUseCase = new RegisterUseCase(userRepository);

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'jhondoe@email.com',
            address: 'rua do canto',
            password: '123456',
            phone: '11999999999'
        })

        expect(user.id).toEqual(expect.any(Number))
    })    


    it('should hash user password upon registration', async () => {
        const userRepository = new InMemoryUserRepository();
        const registerUseCase = new RegisterUseCase(userRepository);
    
    const {user} = await registerUseCase.execute({
        name: 'John Doe',
        email: 'jhondoe@email.com',
        address:'rua do canto',
        password: '123456',
        phone: '11999999999'
    })

    const isHashed = await compare(
        '123456',
        user.password
    )

    expect(isHashed).toBe(true);

    })

    it('should not be able to register with same email twice', async () => {
        const userRepository = new InMemoryUserRepository();
        const registerUseCase = new RegisterUseCase(userRepository);
    
    const email = 'jhondoe@email.com'
    await registerUseCase.execute({
        name: 'John Doe',
        email: email,
        address:'rua do canto',
        password: '123456',
        phone: '11999999999'
    })

    await expect(() => registerUseCase.execute({
        name: 'John Doe',
        email: email,
        address:'rua do canto',
        password: '123456',
        phone: '11999999999'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)

    })
})