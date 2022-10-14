import AppError from "../../../shared/infra/http/errors/AppError";
import FakeAddressesRepository from "../../addresses/repositories/fakes/FakeAddressesRepository";
import FakeClientsRepository from "../repositories/fakes/FakeClientsRepository";
import FindClientsService from "./FindClientsService";

let fakeClientsRepository: FakeClientsRepository;
let fakeAddressesRepository: FakeAddressesRepository;
let findClientsService: FindClientsService;

describe('FindClients', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    fakeAddressesRepository = new FakeAddressesRepository();
    findClientsService = new FindClientsService(
      fakeClientsRepository,
      fakeAddressesRepository
    );
  });

  it('should not be able to return non-existing clients', async () => {
    await expect(
      findClientsService.execute({
        clientId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to find clients', async () => {
    const { _id } = await fakeClientsRepository.create({
      contactName: 'John Doe',
      document: '00000000000100',
      phone: '00000000',
      socialReason: 'Social Reason',
    });

    const client = await findClientsService.execute({
      clientId: _id.toString(),
    });

    expect(client._id.toString()).toBe(_id.toString());
  });
});
