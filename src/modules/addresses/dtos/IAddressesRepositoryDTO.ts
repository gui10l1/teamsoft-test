export default interface IAddressesRepositoryDTO {
  address: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  clientId: string;
  lat: string;
  long: string;
}
