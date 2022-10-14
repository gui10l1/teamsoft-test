import AppError from "../../../shared/infra/http/errors/AppError";
import FakeAddressesRepository from "../repositories/fakes/FakeAddressesRepository";
import FindAddressesService from "./FindAddressesService";

let fakeAddressesRepository: FakeAddressesRepository;
let findAddressesService: FindAddressesService;

describe('FindAddresses', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    findAddressesService = new FindAddressesService(fakeAddressesRepository);
  });

  it('should not be able to return non-existing addresses', async () => {
    await expect(
      findAddressesService.execute({
        addressId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to find addresses', async () => {
    const { _id } = await fakeAddressesRepository.create({
      address: 'Address',
      lat: 9.001335844,
      lng: -9.1485338596,
      neighborhood: 'neighborhood',
      number: 'Address number',
      postalCode: '123445',
      state: 'State',
      clientId: '',
      city: 'City'
    });

    const address = await findAddressesService.execute({
      addressId: _id.toString(),
    });

    expect(address._id.toString()).toBe(_id.toString());
  });
});
