import AppError from "../../../shared/infra/http/errors/AppError";
import FakeLocationProvider from "../../../shared/providers/LocationProvider/fakes/FakeLocationProvider";
import FakeClientsRepository from "../../clients/repositories/fakes/FakeClientsRepository";
import FakeAddressesRepository from "../repositories/fakes/FakeAddressesRepository";
import UpdateAddressesService from "./UpdateAddressesService";

let fakeAddressesRepository: FakeAddressesRepository;
let fakeClientsRepository: FakeClientsRepository;
let fakeLocationProvider: FakeLocationProvider;
let updateAddressesService: UpdateAddressesService;

describe('UpdateAddresses', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeClientsRepository = new FakeClientsRepository();
    fakeLocationProvider = new FakeLocationProvider();
    updateAddressesService = new UpdateAddressesService(
      fakeAddressesRepository,
      fakeClientsRepository,
      fakeLocationProvider,
    );
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

  it('should not be able to update address client to a non-existing one', async () => {
    const { _id } = await fakeAddressesRepository.create({
      address: 'Address',
      city: 'City name',
      lat: 9.001335844,
      lng: -9.1485338596,
      neighborhood: 'neighborhood',
      number: 'Address number',
      postalCode: '123445',
      state: 'State',
      clientId: 'existingClient',
    });

    await expect(
      updateAddressesService.execute({
        addressId: _id.toString(),
        data: {
          address: 'Another Address',
          city: 'City updated',
          neighborhood: 'new neighborhood',
          number: 'Address number 2',
          postalCode: '798456',
          state: 'State new',
          complement: 'New complement',
          clientId: 'nonExistingClient'
        }
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update address lat and lng when geolocation info is not defined', async () => {
    jest
      .spyOn(fakeLocationProvider, 'getLocation')
      .mockImplementationOnce(async () => {
        return {
          results: [],
          status: 'ZERO_RESULTS',
        }
      });

    const { _id: clientId } = await fakeClientsRepository.create({
      contactName: 'John Doe',
      document: '00000000000100',
      phone: '00000000',
      socialReason: 'Social Reason',
    });

    const { _id } = await fakeAddressesRepository.create({
      address: 'Address',
      city: 'City name',
      lat: 9.001335844,
      lng: -9.1485338596,
      neighborhood: 'neighborhood',
      number: 'Address number',
      postalCode: '123445',
      state: 'State',
      clientId: 'existingClient',
    });

    await expect(
      updateAddressesService.execute({
        addressId: _id.toString(),
        data: {
          address: 'INVALID-ADDRESS',
          city: 'City updated',
          neighborhood: 'new neighborhood',
          number: 'Address number 2',
          postalCode: '798456',
          state: 'State new',
          complement: 'New complement',
          clientId: clientId.toString(),
        }
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update addresses', async () => {
    const { _id } = await fakeAddressesRepository.create({
      address: 'Address',
      city: 'City name',
      lat: 9.001335844,
      lng: -9.1485338596,
      neighborhood: 'neighborhood',
      number: 'Address number',
      postalCode: '123445',
      state: 'State',
      clientId: 'existingClient',
    });

    const updatedAddress = await updateAddressesService.execute({
      addressId: _id.toString(),
      data: {
        address: 'Another Address',
        city: 'City updated',
        neighborhood: 'new neighborhood',
        number: 'Address number 2',
        postalCode: '798456',
        state: 'State new',
        complement: 'New complement',
      }
    });

    expect(updatedAddress._id.toString()).toBe(_id.toString());
    expect(updatedAddress.address).toBe('Another Address');
    expect(updatedAddress.city).toBe('City updated');
    expect(updatedAddress.lat).toBe(-9.154546456);
    expect(updatedAddress.lng).toBe(2.456456);
    expect(updatedAddress.neighborhood).toBe('new neighborhood');
    expect(updatedAddress.number).toBe('Address number 2');
    expect(updatedAddress.postal_code).toBe('798456');
    expect(updatedAddress.state).toBe('State new');
    expect(updatedAddress.complement).toBe('New complement');
  });
});
