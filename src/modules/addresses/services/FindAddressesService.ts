import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/infra/http/errors/AppError";
import Address from "../infra/mongoose/entities/Address";
import IAddressesRepository from "../repositories/IAddressesRepository";

interface IRequest {
  addressId: string;
}

@injectable()
export default class FindAddressesService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute({ addressId }: IRequest): Promise<Address> {
    const address = await this.addressesRepository.findById(addressId);

    if (!address) {
      throw new AppError('Address not found!');
    }

    return address;
  }
}
