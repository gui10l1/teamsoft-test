import { ObjectId } from "mongodb";
import IClientsRepositoryDTO from "../../dtos/IClientsRepositoryDTO";
import Client from "../../infra/mongoose/entities/Client";
import IClientsRepository from "../IClientsRepository";

export default class FakeClientsRepository implements IClientsRepository {
  private clients: Client[] = [];

  public async create(data: IClientsRepositoryDTO): Promise<Client> {
    const client = new Client();

    Object.assign(client, {
      _id: new ObjectId(),
      document: data.document,
      social_reason: data.socialReason,
      contact_name: data.contactName,
      phone: data.phone,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.clients.push(client);

    return client;
  }

  public async findById(id: string): Promise<Client | undefined> {
    return this.clients.find(item => item._id.toString() === id);
  }

  public async findByDocument(document: string): Promise<Client | undefined> {
    return this.clients.find(item => item.document === document);
  }

  public async list(): Promise<Client[]> {
    return this.clients;
  }

  public async update(client: Client, data: Partial<IClientsRepositoryDTO>): Promise<Client> {
    const findIndex = this.clients.findIndex(
      item => item._id.toString() === client._id.toString()
    );

    Object.assign(client, {
      document: data.document,
      social_reason: data.socialReason,
      contact_name: data.contactName,
      phone: data.phone,
      updated_at: new Date(),
    });

    this.clients[findIndex] = client;

    return client;
  }

  public async delete(client: Client): Promise<void> {
    const findIndex = this.clients.findIndex(
      item => item._id.toString() === client._id.toString()
    );

    this.clients.splice(findIndex, 1);
  }
}
