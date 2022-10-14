import { inject, injectable } from "tsyringe";
// import AppError from "../../../shared/infra/http/errors/AppError";
import IAddressesRepositoryDTO from "../dtos/IAddressesRepositoryDTO";
import Address from "../infra/mongoose/entities/Address";
import IAddressesRepository from "../repositories/IAddressesRepository";

@injectable()
export default class CreateAddressesService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(data: IAddressesRepositoryDTO): Promise<Address> {
    return this.addressesRepository.create(data);
  }
};
