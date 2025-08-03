import { ProfessionalAlreadyExistsError } from "../Errors/Professional/ProfessionaAlreadyExists";
import { IProfessionalRepository } from "../Interface/IProfessionalRepository";

interface ProfessionalServicesRequest {
    name: string;
    email: string;
    password: string;
    adress: string;
    phone: string;
    
}

export class RegisterProfessionalServices {
    constructor(private professionalRepository: IProfessionalRepository) {}

    async execute({
      name,
      email,
      password,
      adress,
      phone  
    }: ProfessionalServicesRequest) {

        const professionalWithSameEmail = await this.professionalRepository.findByEmail(email);

        if (professionalWithSameEmail) {
            throw new ProfessionalAlreadyExistsError();
        }

        const professional = await this.professionalRepository.create({
            name,
            email,
            password,
            adress,
            phone
        });

        return {
            professional
        };
    }

}