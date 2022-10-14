import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/infra/http/errors/AppError";
import IClientsRepositoryDTO from "../dtos/IClientsRepositoryDTO";
import Client from "../infra/mongoose/entities/Client";
import IClientsRepository from "../repositories/IClientsRepository";

interface IRequest {
  clientId: string;
  data: Partial<IClientsRepositoryDTO>;
}

@injectable()
export default class UpdateClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientRepository: IClientsRepository,
  ) {}

  public async execute({ data, clientId }: IRequest): Promise<Client> {
    const findClient = await this.clientRepository.findById(clientId);

    if (!findClient) throw new AppError('Cannot update non-existing client!');

    const { document } = data;

    if (document && findClient.document !== document) {
      const findClientByDocument = await this.clientRepository.findByDocument(
        document,
      );

      if (findClientByDocument) {
        throw new AppError('Another client is already using this document');
      }
    }

    return this.clientRepository.update(findClient, data);
  }
}
