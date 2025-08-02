import { IProfessionalRepository } from "../Interface/IProfessionalRepository";

interface ProfessionalServicesRequest {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    
}

export class ProfessionalServices {
    constructor(private professionalRepository: IProfessionalRepository) {}


}