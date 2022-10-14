import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/infra/http/errors/AppError";
import ILocationProvider from "../../../shared/providers/LocationProvider/models/ILocationProvider";
import IClientsRepository from "../../clients/repositories/IClientsRepository";
import IAddressesRepositoryDTO from "../dtos/IAddressesRepositoryDTO";
import Address from "../infra/mongoose/entities/Address";
import IAddressesRepository from "../repositories/IAddressesRepository";

interface IRequest {
  addressId: string;
  data: Omit<Partial<IAddressesRepositoryDTO>, 'lat' | 'lng'>;
}

@injectable()
export default class UpdateAddressesService {
  constructor(
    @inject('AddressesRepository')
    private addressRepository: IAddressesRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('LocationProvider')
    private locationProvider: ILocationProvider,
  ) {}

  public async execute({ data, addressId }: IRequest): Promise<Address> {
    const findAddress = await this.addressRepository.findById(addressId);

    if (!findAddress) throw new AppError('Cannot update non-existing address!');

    const { clientId, address } = data;

    if (clientId && clientId !== findAddress.client_id) {
      const findClient = await this.clientsRepository.findById(clientId);

      if (!findClient) throw new AppError('Client informed not found!');
    }

    let lat = findAddress.lat;
    let lng = findAddress.lng;

    if (address && address !== findAddress.address) {
      const { results, status } = await this.locationProvider.getLocation(
        address
      );

      if (status === 'ZERO_RESULTS') {
        throw new AppError(
          'Unable to find your geolocation information. Please, check your data inside `address` field and try again!'
        );
      }

      const [addressFound] = results;
      const {
        geometry: {
          location: {
            lat: newLat,
            lng: newLng
          }
        }
      } = addressFound;

      lat = newLat;
      lng = newLng;
    }

    return this.addressRepository.update(findAddress, { ...data, lat, lng });
  }
}
