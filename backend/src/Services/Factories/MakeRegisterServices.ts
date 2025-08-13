import {PrismaServiceRepository} from '../../Repositories/PrismaServicesRepository'
import {RegisterProfessionalServices} from '../../Services/RegisterProfessionaServices'

export function MakeCreateServiceUseCase() {
  const serviceRepository = new PrismaServiceRepository();
  const createService = new RegisterProfessionalServices(serviceRepository)

  return createService
}