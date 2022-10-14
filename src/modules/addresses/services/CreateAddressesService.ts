import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/infra/http/errors/AppError";
import ILocationProvider from "../../../shared/providers/LocationProvider/models/ILocationProvider";
import IClientsRepository from "../../clients/repositories/IClientsRepository";
// import AppError from "../../../shared/infra/http/errors/AppError";
import IAddressesRepositoryDTO from "../dtos/IAddressesRepositoryDTO";
import Address from "../infra/mongoose/entities/Address";
import IAddressesRepository from "../repositories/IAddressesRepository";

@injectable()
export default class CreateAddressesService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('LocationProvider')
    private locationProvider: ILocationProvider,
  ) {}

  public async execute(
    data: Omit<IAddressesRepositoryDTO, 'lat' | 'lng'>
  ): Promise<Address> {
    const { address, clientId } = data;

    const findClient = await this.clientsRepository.findById(clientId);

    if (!findClient) throw new AppError('Client informed does not exist!');

    const { results, status } = await this.locationProvider.getLocation(address);

    if (status === 'ZERO_RESULTS') {
      throw new AppError(
        'Unable to find your geolocation information. Please, check your data inside `address` field and try again!'
      );
    }

    const [addressFound] = results;
    const { geometry: { location: { lat, lng } } } = addressFound;

    return this.addressesRepository.create({
      ...data,
      lat,
      lng,
    });
  }
};
