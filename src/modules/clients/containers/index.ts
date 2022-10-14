import { container } from "tsyringe";

import ClientsRepository from "../infra/mongoose/repositories/ClientsRepository";
import IClientsRepository from "../repositories/IClientsRepository";

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository
);
