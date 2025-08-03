import { PrismaProfessionalRepository } from "../../Repositories/PrismaProfessionalRepository";
import { RegisterProfessionalServices } from "../RegisterProfessionaServices";

export function MakeRegisterProfessionalUseCase() {
    const prismaProfessionalRepository = new PrismaProfessionalRepository()
    const registerProfessionalService = new RegisterProfessionalServices(prismaProfessionalRepository)

    return registerProfessionalService;
}