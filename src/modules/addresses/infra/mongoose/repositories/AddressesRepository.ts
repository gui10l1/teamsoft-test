import mongoose, { Model } from "mongoose";
import AppError from "../../../../../shared/infra/http/errors/AppError";
import IAddressesRepositoryDTO from "../../../dtos/IAddressesRepositoryDTO";
import IAddressesRepository from "../../../repositories/IAddressesRepository";
import Address from "../entities/Address";
import addressesSchema from "../schemas/addresses.schema";

export default class AddressesRepository implements IAddressesRepository {
  private model: Model<Address>;

  constructor() {
    this.model = mongoose.model<Address>('Address', addressesSchema);
  }

  public async create(data: IAddressesRepositoryDTO): Promise<Address> {
    const address = await this.model.create({
      address: data.address,
      number: data.number,
      complement: data.complement,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      postal_code: data.postalCode,
      lat: data.lat,
      long: data.long,
      client_id: data.clientId,
    });

    await address.save();

    return address;
  }

  public async list(): Promise<Address[]> {
    return this.model.find();
  }

  public async listByClientId(clientId: string): Promise<Address[]> {
    return this.model.find({
      client_id: clientId,
    })
  }

  public async findByPostalCode(postalCode: string): Promise<Address | undefined> {
    const address = await this.model.findOne({
      postal_code: postalCode,
    });

    if (!address) return undefined;

    return address;
  }

  public async findById(id: string): Promise<Address | undefined> {
    try {
      const address = await this.model.findById(id);

      if (!address) return undefined;

      return address;
    } catch {
      throw new AppError('Parameter given is not valid!');
    }
  }

  public async update(address: Address, data: Partial<IAddressesRepositoryDTO>): Promise<Address> {
    await this.model.updateOne(address, {
      address: data.address,
      number: data.number,
      complement: data.complement,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      postal_code: data.postalCode,
      lat: data.lat,
      long: data.long,
      client_id: data.clientId,
    });

    const addressUpdated = await this.findById(address._id.toString()) as Address;

    return addressUpdated;
  }

  public async delete(address: Address): Promise<void> {
    await this.model.deleteOne(address);
  }
}
