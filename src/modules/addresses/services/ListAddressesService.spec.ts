import FakeAddressesRepository from "../repositories/fakes/FakeAddressesRepository";
import ListAddressesService from "./ListAddressesService";

let fakeAddressesRepository: FakeAddressesRepository;
let listAddressesService: ListAddressesService;

describe('ListAddresses', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    listAddressesService = new ListAddressesService(fakeAddressesRepository);
  });

  it('should be able to list all addresses from database', async () => {
    const addressOne = await fakeAddressesRepository.create({
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
    const addressTwo = await fakeAddressesRepository.create({
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
    const addressThree = await fakeAddressesRepository.create({
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
    const addressFour = await fakeAddressesRepository.create({
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

    const addresses = await listAddressesService.execute();

    expect(addresses).toEqual([
      addressOne,
      addressTwo,
      addressThree,
      addressFour,
    ]);
  });
});
