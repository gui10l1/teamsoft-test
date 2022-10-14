import mongoose, { Model } from "mongoose";
import AppError from "../../../../../shared/infra/http/errors/AppError";
import IClientsRepositoryDTO from "../../../dtos/IClientsRepositoryDTO";
import IClientsRepository from "../../../repositories/IClientsRepository";
import Client from "../entities/Client";
import clientsSchema from "../schemas/client.schema";

export default class ClientsRepository implements IClientsRepository {
  private model: Model<Client>;

  constructor() {
    this.model = mongoose.model<Client>('Client', clientsSchema);
  }

  public async create(data: IClientsRepositoryDTO): Promise<Client> {
    const client = await this.model.create({
      document: data.document,
      social_reason: data.socialReason,
      contact_name: data.contactName,
      phone: data.phone,
    });

    await client.save();

    return client;
  }

  public async list(): Promise<Client[]> {
    return this.model.find();
  }

  public async findByDocument(document: string): Promise<Client | undefined> {
    const client = await this.model.findOne({
      document,
    });

    if (!client) return undefined;

    return client;
  }

  public async findById(id: string): Promise<Client | undefined> {
    try {
      const client = await this.model.findById(id);

      if (!client) return undefined;

      return client;
    } catch {
      throw new AppError('Parameter given is not valid!');
    }
  }

  public async update(client: Client, data: Partial<IClientsRepositoryDTO>): Promise<Client> {
    await this.model.updateOne(client, {
      document: data.document,
      social_reason: data.socialReason,
      contact_name: data.contactName,
      phone: data.phone,
    });

    const clientUpdated = await this.findById(client._id.toString()) as Client;

    return clientUpdated;
  }

  public async delete(client: Client): Promise<void> {
    await this.model.deleteOne(client);
  }
}
