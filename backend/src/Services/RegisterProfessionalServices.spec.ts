import {beforeEach, it, describe, expect} from 'vitest'
import { InMemoruProfessionalRepository } from "../Repositories/in-memory/in-memory.professional.repository";
import { RegisterProfessionalServices } from "./RegisterProfessionaServices";


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
})

