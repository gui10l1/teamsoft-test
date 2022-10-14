import { inject, injectable } from "tsyringe";
import IAddressesRepository from "../../addresses/repositories/IAddressesRepository";
import Client from "../infra/mongoose/entities/Client";
import IClientsRepository from "../repositories/IClientsRepository";

@injectable()
export default class ListClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(): Promise<Client[]> {
    const clients = await this.clientsRepository.list();

    const parsedClients = Promise.all(clients.map(async client => {
      const addresses = await this.addressesRepository.listByClientId(
        client._id.toString()
      );

      return {
        _id: client._id,
        document: client.document,
        social_reason: client.social_reason,
        contact_name: client.contact_name,
        phone: client.phone,
        addresses,
        created_at: client.created_at,
        updated_at: client.updated_at,
      };
    }));

    return parsedClients;
  }
}
