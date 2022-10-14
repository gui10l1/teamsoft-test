import AppError from "../../../shared/infra/http/errors/AppError";
import FakeAddressesRepository from "../repositories/fakes/FakeAddressesRepository";
import DeleteAddressesService from "./DeleteAddressesService";

let fakeAddressesRepository: FakeAddressesRepository;
let deleteAddressesService: DeleteAddressesService;

describe('DeleteAddresses', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    deleteAddressesService = new DeleteAddressesService(fakeAddressesRepository);
  });

  it('should not be able to delete non-existing addresses', async () => {
    await expect(
      deleteAddressesService.execute({
        addressId: 'non-existing-user',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete addresses', async () => {
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

    await deleteAddressesService.execute({ addressId: _id.toString() });

    const findAddress = await fakeAddressesRepository.findById(_id.toString());

    expect(findAddress).toBeFalsy();
  });
});
