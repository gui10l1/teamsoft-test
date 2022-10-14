import FakeAddressesRepository from "../repositories/fakes/FakeAddressesRepository";
import CreateAddressesService from "./CreateAddressesService";

let fakeAddressesRepository: FakeAddressesRepository;
let createAddressesService: CreateAddressesService;

describe('CreateAddresses', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    createAddressesService = new CreateAddressesService(fakeAddressesRepository);
  });

  it('should be able to create new addresses', async () => {
    const client = await createAddressesService.execute({
      address: 'Address',
      city: 'City name',
      lat: '9.001335844',
      long: '-9.1485338596',
      neighborhood: 'neighborhood',
      number: 'Address number',
      postalCode: '123445',
      state: 'State',
      clientId: '',
    });

    expect(client).toHaveProperty('_id');
  });
})
