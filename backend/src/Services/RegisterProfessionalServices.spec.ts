import {beforeEach, it, describe, expect} from 'vitest'
import { InMemoruProfessionalRepository } from "../Repositories/in-memory/in-memory.professional.repository";
import { RegisterProfessionalServices } from "./RegisterProfessionaServices";
import { compare } from 'bcryptjs';
import { ProfessionalAlreadyExistsError } from '../Errors/Professional/ProfessionaAlreadyExists';


let professionalRepository: InMemoruProfessionalRepository;
let sut: RegisterProfessionalServices

beforeEach(() => {
    professionalRepository = new InMemoruProfessionalRepository();
    sut = new RegisterProfessionalServices(professionalRepository);
})

describe('Register Professional', () => {
    it('should be able to register a new user', async () => {
        const { professional } = await sut.execute({
            name: 'John Doe',
            email: 'jhondoe@email.com',
            adress: 'rua do canto',
            password: '123456',
            phone: '11999999999'
        })

        expect(professional.id).toEqual(expect.any(Number))
    })

    it('should hash user password upon registration', async () => {
        
        const {professional} = await sut.execute({
            name: 'John Doe',
            email: 'jhondoe@email.com',
            adress:'rua do canto',
            password: '123456',
            phone: '11999999999'
        })
    
        const isHashed = await compare(
            '123456',
            professional.password
        )

        console.log(isHashed)
    
        expect(isHashed).toBe(true);
    
        })
    
        it('should not be able to register with same email twice', async () => {
        
        const email = 'jhondoe@email.com'
        await sut.execute({
            name: 'John Doe',
            email: email,
            adress:'rua do canto',
            password: '123456',
            phone: '11999999999'
        })
    
        await expect(() => sut.execute({
            name: 'John Doe',
            email: email,
            adress:'rua do canto',
            password: '123456',
            phone: '11999999999'
        })).rejects.toBeInstanceOf(ProfessionalAlreadyExistsError)
    
        })
})

