import AppError from "../../../shared/infra/http/errors/AppError";
import FakeAddressesRepository from "../repositories/fakes/FakeAddressesRepository";
import UpdateAddressesService from "./UpdateAddressesService";

let fakeAddressesRepository: FakeAddressesRepository;
let updateAddressesService: UpdateAddressesService;

describe('UpdateAddresses', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    updateAddressesService = new UpdateAddressesService(fakeAddressesRepository);
  });

  it('should not be able to update non-existing addresses', async () => {
    await expect(
      updateAddressesService.execute({
        addressId: 'non-existing-address',
        data: {
          address: 'updatedAddress',
        }
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update addresses', async () => {
    const { _id } = await fakeAddressesRepository.create({
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

    const updatedAddress = await updateAddressesService.execute({
      addressId: _id.toString(),
      data: {
        address: 'Another Address',
        city: 'City updated',
        lat: '0.45498487',
        long: '-1.001333543',
        neighborhood: 'new neighborhood',
        number: 'Address number 2',
        postalCode: '798456',
        state: 'State new',
        complement: 'New complement'
      }
    });

    expect(updatedAddress._id.toString()).toBe(_id.toString());
    expect(updatedAddress.address).toBe('Another Address');
    expect(updatedAddress.city).toBe('City updated');
    expect(updatedAddress.lat).toBe('0.45498487');
    expect(updatedAddress.long).toBe('-1.001333543');
    expect(updatedAddress.neighborhood).toBe('new neighborhood');
    expect(updatedAddress.number).toBe('Address number 2');
    expect(updatedAddress.postal_code).toBe('798456');
    expect(updatedAddress.state).toBe('State new');
    expect(updatedAddress.complement).toBe('New complement');
  });
});
