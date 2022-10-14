import AppError from "../../../shared/infra/http/errors/AppError";
import FakeClientsRepository from "../repositories/fakes/FakeClientsRepository";
import UpdateClientsService from "./UpdateClientsService";

let fakeClientsRepository: FakeClientsRepository;
let updateClientsService: UpdateClientsService;

describe('UpdateClients', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    updateClientsService = new UpdateClientsService(fakeClientsRepository);
  });

  it('should not be able to update non-existing clients', async () => {
    await expect(
      updateClientsService.execute({
        clientId: 'non-existing-client',
        data: {
          phone: 'updatedPhone',
        }
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to duplicate documents by edit action', async () => {
    await fakeClientsRepository.create({
      contactName: 'John Doe',
      document: '00002001000200',
      phone: '00001111',
      socialReason: 'Social Reason',
    });

    const { _id } = await fakeClientsRepository.create({
      contactName: 'John Doe',
      document: '00001002000100',
      phone: '00001111',
      socialReason: 'Social Reason',
    });

    await expect(
      updateClientsService.execute({
        clientId: _id.toString(),
        data: {
          document: '00002001000200',
        }
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update clients', async () => {
    const { _id } = await fakeClientsRepository.create({
      contactName: 'John Doe',
      document: '00001002000100',
      phone: '00001111',
      socialReason: 'Social Reason',
    });

    const updatedClient = await updateClientsService.execute({
      clientId: _id.toString(),
      data: {
        contactName: 'Jenna Doe',
        document: '00002001000200',
        phone: '11110000',
        socialReason: 'Reason Social',
      }
    });

    expect(updatedClient._id.toString()).toBe(_id.toString());
    expect(updatedClient.contact_name).toBe('Jenna Doe');
    expect(updatedClient.document).toBe('00002001000200');
    expect(updatedClient.phone).toBe('11110000');
    expect(updatedClient.social_reason).toBe('Reason Social');
  });
});
