import { expect, test, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './UserService';
import { compare } from 'bcryptjs';
import { InMemoryUserRepository } from '../../Repositories/in-memory/in-memory.user.repository';
import { UserAlreadyExistsError } from '../../Errors/Users/UserAlreadExists';

let usersRepository: InMemoryUserRepository;
let sut: RegisterUseCase

beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new RegisterUseCase(usersRepository);
})

describe('Register UseCase', () => {

    it('should be able to register a new user', async () => {

        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'jhondoe@email.com',
            address: 'rua do canto',
            password: '123456',
            phone: '11999999999'
        })

        expect(user.id).toEqual(expect.any(Number))
    })    


    it('should hash user password upon registration', async () => {
    
    const {user} = await sut.execute({
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
    
    const email = 'jhondoe@email.com'
    await sut.execute({
        name: 'John Doe',
        email: email,
        address:'rua do canto',
        password: '123456',
        phone: '11999999999'
    })

    await expect(() => sut.execute({
        name: 'John Doe',
        email: email,
        address:'rua do canto',
        password: '123456',
        phone: '11999999999'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)

    })
})