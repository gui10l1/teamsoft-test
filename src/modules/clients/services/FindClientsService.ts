import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/infra/http/errors/AppError";
import IAddressesRepository from "../../addresses/repositories/IAddressesRepository";
import Client from "../infra/mongoose/entities/Client";
import IClientsRepository from "../repositories/IClientsRepository";

interface IRequest {
  clientId: string;
}

@injectable()
export default class FindClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute({ clientId }: IRequest): Promise<Client> {
    const client = await this.clientsRepository.findById(clientId);

    if (!client) {
      throw new AppError('Client not found!');
    }

    const addresses = await this.addressesRepository.listByClientId(
      client._id.toString()
    );

    Object.assign(client, { addresses });

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
  }
}
