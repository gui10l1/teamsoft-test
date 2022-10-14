import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/infra/http/errors/AppError";
import IClientsRepositoryDTO from "../dtos/IClientsRepositoryDTO";
import Client from "../infra/mongoose/entities/Client";
import IClientsRepository from "../repositories/IClientsRepository";

@injectable()
export default class CreateClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(data: IClientsRepositoryDTO): Promise<Client> {
    const { document } = data;

    const findDuplicated = await this.clientsRepository.findByDocument(
      document,
    );

    if (findDuplicated) {
      throw new AppError('Another client is already using this document!');
    }

    return this.clientsRepository.create(data);
  }
};
