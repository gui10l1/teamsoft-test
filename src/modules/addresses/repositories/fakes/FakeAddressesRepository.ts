import { ObjectId } from "mongodb";
import IAddressesRepositoryDTO from "../../dtos/IAddressesRepositoryDTO";
import Address from "../../infra/mongoose/entities/Address";
import IAddressesRepository from "../IAddressesRepository";

export default class FakeAddressesRepository implements IAddressesRepository {
  private addresses: Address[] = [];

  public async create(data: IAddressesRepositoryDTO): Promise<Address> {
    const address = new Address();

    Object.assign(address, {
      _id: new ObjectId(),
      address: data.address,
      number: data.number,
      complement: data.complement,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      postal_code: data.postalCode,
      lat: data.lat,
      lng: data.lng,
      client_id: data.clientId,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.addresses.push(address);

    return address;
  }

  public async findById(id: string): Promise<Address | undefined> {
    return this.addresses.find(item => item._id.toString() === id);
  }

  public async findByPostalCode(postalCode: string): Promise<Address | undefined> {
    return this.addresses.find(item => item.postal_code === postalCode);
  }

  public async list(): Promise<Address[]> {
    return this.addresses;
  }

  public async listByClientId(clientId: string): Promise<Address[]> {
    return this.addresses.filter(item => item.client_id === clientId);
  }

  public async update(address: Address, data: Partial<IAddressesRepositoryDTO>): Promise<Address> {
    const findIndex = this.addresses.findIndex(
      item => item._id.toString() === address._id.toString()
    );

    Object.assign(address, {
      address: data.address,
      number: data.number,
      complement: data.complement,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      postal_code: data.postalCode,
      lat: data.lat,
      lng: data.lng,
      client_id: data.clientId,
      updated_at: new Date(),
    });

    this.addresses[findIndex] = address;

    return address;
  }

  public async delete(address: Address): Promise<void> {
    const findIndex = this.addresses.findIndex(
      item => item._id.toString() === address._id.toString()
    );

    this.addresses.splice(findIndex, 1);
  }
}
