import { expect, describe, it } from 'vitest'
import { hash } from 'bcryptjs';
import { InMemoryUserRepository } from '../Repositories/in-memory/in-memory.user.repository';
import { AuthenticateUseCase } from './AuthenticateSevice';
import { InvalidCredentialsError } from '../Errors/Users/InvalidCredentialsErrors';


describe('Authenticate UseCase', () => {

    it('should be able to register a new user', async () => {
        const usersRepository = new InMemoryUserRepository();
        const sut = new AuthenticateUseCase(usersRepository);

        await usersRepository.create({
            name: 'John Doe',
            email: 'jhondoe@email.com',
            address: 'rua do canto',
            password: await hash('123456', 6),
            phone: '11999999999'
        })

        const { user } = await sut.execute({
            email: 'jhondoe@email.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(Number))
    }) 
    
    it('should not be able to authenticate with wrong email', async () => {
        const usersRepository = new InMemoryUserRepository();
        const sut = new AuthenticateUseCase(usersRepository);

        await expect(
            sut.execute({
              email: 'jhon@email.com',
              password:'1234567'
            })
          ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const usersRepository = new InMemoryUserRepository();
        const sut = new AuthenticateUseCase(usersRepository);

        await usersRepository.create({
            name: 'John Doe',
            email: 'jhondoe@email.com',
            address: 'rua do canto',
            password: await hash('123456', 6),
            phone: '11999999999'
        })

        await expect(
            sut.execute({
                email: 'jhondoe@email.com',
                password:'12345'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
    
})