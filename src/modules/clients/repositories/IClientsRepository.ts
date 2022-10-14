import IClientsRepositoryDTO from "../dtos/IClientsRepositoryDTO";
import Client from "../infra/mongoose/entities/Client";

export default interface IClientsRepository {
  create(data: IClientsRepositoryDTO): Promise<Client>;

  findById(id: string): Promise<Client | undefined>;
  findByDocument(document: string): Promise<Client | undefined>;

  update(client: Client, data: Partial<IClientsRepositoryDTO>): Promise<Client>;

  list(): Promise<Client[]>;

  delete(client: Client): Promise<void>;
}
