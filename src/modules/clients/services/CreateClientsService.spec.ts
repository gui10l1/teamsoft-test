import AppError from "../../../shared/infra/http/errors/AppError";
import FakeClientsRepository from "../repositories/fakes/FakeClientsRepository";
import CreateClientsService from "./CreateClientsService";

let fakeClientsRepository: FakeClientsRepository;
let createClientsService: CreateClientsService;

describe('CreateClients', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    createClientsService = new CreateClientsService(fakeClientsRepository);
  });

  it('should not be able to create clients with duplicated document (CNPJ)', async () => {
    await fakeClientsRepository.create({
      contactName: 'John Doe',
      document: '00000000000100',
      phone: '00000000',
      socialReason: 'Social Reason',
    });

    await expect(
      createClientsService.execute({
        contactName: 'Jenna Doe',
        document: '00000000000100',
        phone: '00000001',
        socialReason: 'Social Reason'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create new clients', async () => {
    const client = await createClientsService.execute({
      contactName: 'John Doe',
      document: '00000000000100',
      phone: '00000000',
      socialReason: 'Social Reason',
    });

    expect(client).toHaveProperty('_id');
  });
})
