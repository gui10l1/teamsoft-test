import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/infra/http/errors/AppError";
import IAddressesRepository from "../repositories/IAddressesRepository";

interface IRequest {
  addressId: string;
}

@injectable()
export default class DeleteAddressesService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute({ addressId }: IRequest): Promise<void> {
    const address = await this.addressesRepository.findById(addressId);

    if (!address) throw new AppError('Cannot delete a non-existing address!');

    await this.addressesRepository.delete(address);
  }
}
