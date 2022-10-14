import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/infra/http/errors/AppError";
import IAddressesRepositoryDTO from "../dtos/IAddressesRepositoryDTO";
import Address from "../infra/mongoose/entities/Address";
import IAddressesRepository from "../repositories/IAddressesRepository";

interface IRequest {
  addressId: string;
  data: Partial<IAddressesRepositoryDTO>;
}

@injectable()
export default class UpdateAddressesService {
  constructor(
    @inject('AddressesRepository')
    private addressRepository: IAddressesRepository,
  ) {}

  public async execute({ data, addressId }: IRequest): Promise<Address> {
    const findAddress = await this.addressRepository.findById(addressId);

    if (!findAddress) throw new AppError('Cannot update non-existing address!');

    return this.addressRepository.update(findAddress, data);
  }
}
