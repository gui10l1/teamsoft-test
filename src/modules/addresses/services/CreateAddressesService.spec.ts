import AppError from "../../../shared/infra/http/errors/AppError";
import FakeLocationProvider from "../../../shared/providers/LocationProvider/fakes/FakeLocationProvider";
import FakeClientsRepository from "../../clients/repositories/fakes/FakeClientsRepository";
import FakeAddressesRepository from "../repositories/fakes/FakeAddressesRepository";
import CreateAddressesService from "./CreateAddressesService";

let fakeAddressesRepository: FakeAddressesRepository;
let fakeClientsRepository: FakeClientsRepository;
let fakeLocationProvider: FakeLocationProvider;
let createAddressesService: CreateAddressesService;

describe('CreateAddresses', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeLocationProvider = new FakeLocationProvider();
    fakeClientsRepository = new FakeClientsRepository();
    createAddressesService = new CreateAddressesService(
      fakeAddressesRepository,
      fakeClientsRepository,
      fakeLocationProvider,
    );
  });

  it('should not be able to create addresses related to non-existing clients', async () => {
    await expect(
      createAddressesService.execute({
        address: 'Address',
        city: 'City name',
        neighborhood: 'neighborhood',
        number: 'Address number',
        postalCode: '123445',
        state: 'State',
        clientId: 'non-existing-client',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create addresses when geolocation info is not found', async () => {
    jest
      .spyOn(fakeLocationProvider, 'getLocation')
      .mockImplementationOnce(async () => {
        return {
          results: [],
          status: 'ZERO_RESULTS',
        }
      });

    const { _id } = await fakeClientsRepository.create({
      contactName: 'John Doe',
      document: '00000000000100',
      phone: '00000000',
      socialReason: 'Social Reason',
    });

    await expect(
      createAddressesService.execute({
        address: 'Address',
        city: 'City name',
        neighborhood: 'neighborhood',
        number: 'Address number',
        postalCode: '123445',
        state: 'State',
        clientId: _id.toString(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  })

  it('should be able to create new addresses', async () => {
    const { _id } = await fakeClientsRepository.create({
      contactName: 'John Doe',
      document: '00000000000100',
      phone: '00000000',
      socialReason: 'Social Reason',
    });

    const address = await createAddressesService.execute({
      address: 'Address',
      city: 'City name',
      neighborhood: 'neighborhood',
      number: 'Address number',
      postalCode: '123445',
      state: 'State',
      clientId: _id.toString(),
    });

    expect(address).toHaveProperty('_id');
  });
})
