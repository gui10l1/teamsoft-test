import { inject, injectable } from "tsyringe";
import Address from "../infra/mongoose/entities/Address";
import IAddressesRepository from "../repositories/IAddressesRepository";

@injectable()
export default class ListAddressesService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(): Promise<Address[]> {
    return this.addressesRepository.list();
  }
}
