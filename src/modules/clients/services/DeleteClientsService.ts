import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/infra/http/errors/AppError";
import IClientsRepository from "../repositories/IClientsRepository";

interface IRequest {
  clientId: string;
}

@injectable()
export default class DeleteClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({ clientId }: IRequest): Promise<void> {
    const client = await this.clientsRepository.findById(clientId);

    if (!client) throw new AppError('Cannot delete a non-existing client!');

    await this.clientsRepository.delete(client);
  }
}
