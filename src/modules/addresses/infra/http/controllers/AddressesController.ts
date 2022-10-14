import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import CreateAddressesService from "../../../services/CreateAddressesService";
import DeleteAddressesService from "../../../services/DeleteAddressesService";
import FindAddressesService from "../../../services/FindAddressesService";
import ListAddressesService from "../../../services/ListAddressesService";
import UpdateAddressesService from "../../../services/UpdateAddressesService";

export default class AddressesController {
  public async index(_: Request, res: Response): Promise<Response> {
    const service = container.resolve(ListAddressesService);

    const addresses = await service.execute();

    return res.json(addresses);
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const { addressId } = req.params;

    const service = container.resolve(FindAddressesService);

    const address = await service.execute({ addressId });

    return res.json(address);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const service = container.resolve(CreateAddressesService);

    const address = await service.execute(data);

    return res.json(address);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { addressId } = req.params;
    const data = req.body;

    const service = container.resolve(UpdateAddressesService);

    const address = await service.execute({ data, addressId });

    return res.json(address);
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { addressId } = req.params;

    const service = container.resolve(DeleteAddressesService);

    await service.execute({ addressId });

    return res.send();
  }
}
