import AppError from "../../../shared/infra/http/errors/AppError";
import FakeClientsRepository from "../repositories/fakes/FakeClientsRepository";
import DeleteClientsService from "./DeleteClientsService";

let fakeClientsRepository: FakeClientsRepository;
let deleteClientsService: DeleteClientsService;

describe('DeleteClients', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    deleteClientsService = new DeleteClientsService(fakeClientsRepository);
  });

  it('should not be able to delete non-existing clients', async () => {
    await expect(
      deleteClientsService.execute({
        clientId: 'non-existing-user',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete clients', async () => {
    const { _id } = await fakeClientsRepository.create({
      contactName: 'John Doe',
      document: '00000000000100',
      phone: '00000000',
      socialReason: 'Social Reason',
    });

    await deleteClientsService.execute({ clientId: _id.toString() });

    const findClient = await fakeClientsRepository.findById(_id.toString());

    expect(findClient).toBeFalsy();
  });
});
