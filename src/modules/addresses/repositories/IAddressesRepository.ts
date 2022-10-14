import IAddressesRepositoryDTO from "../dtos/IAddressesRepositoryDTO";
import Address from "../infra/mongoose/entities/Address";

export default interface IAddressesRepository {
  create(data: IAddressesRepositoryDTO): Promise<Address>;

  findById(id: string): Promise<Address | undefined>;
  findByPostalCode(postalCode: string): Promise<Address | undefined>;

  update(address: Address, data: Partial<IAddressesRepositoryDTO>): Promise<Address>;

  list(): Promise<Address[]>;
  listByClientId(clientId: string): Promise<Address[]>;

  delete(address: Address): Promise<void>;
}
