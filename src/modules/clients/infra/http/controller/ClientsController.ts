import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import CreateClientsService from "../../../services/CreateClientsService";
import DeleteClientsService from "../../../services/DeleteClientsService";
import FindClientsService from "../../../services/FindClientsService";
import ListClientsService from "../../../services/ListClientsService";
import UpdateClientsService from "../../../services/UpdateClientsService";

export default class ClientsController {
  public async index(_: Request, res: Response): Promise<Response> {
    const service = container.resolve(ListClientsService);

    const clients = await service.execute();

    return res.json(clients);
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const { clientId } = req.params;

    const service = container.resolve(FindClientsService);

    const client = await service.execute({ clientId });

    return res.json(client);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const service = container.resolve(CreateClientsService);

    const client = await service.execute(data);

    return res.json(client);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { clientId } = req.params;
    const data = req.body;

    const service = container.resolve(UpdateClientsService);

    const client = await service.execute({ data, clientId });

    return res.json(client);
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { clientId } = req.params;

    const service = container.resolve(DeleteClientsService);

    await service.execute({ clientId });

    return res.send();
  }
}
