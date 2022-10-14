import FakeAddressesRepository from "../../addresses/repositories/fakes/FakeAddressesRepository";
import FakeClientsRepository from "../repositories/fakes/FakeClientsRepository";
import ListClientsService from "./ListClientsService";

let fakeClientsRepository: FakeClientsRepository;
let fakeAddressesRepository: FakeAddressesRepository;
let listClientsService: ListClientsService;

describe('ListClients', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    fakeAddressesRepository = new FakeAddressesRepository();
    listClientsService = new ListClientsService(
      fakeClientsRepository,
      fakeAddressesRepository
    );
  });

  it('should be able to list all clients from database', async () => {
    const clientOne = await fakeClientsRepository.create({
      contactName: 'John Doe',
      document: '00000000000100',
      phone: '00000000',
      socialReason: 'Social Reason',
    });
    const clientTwo = await fakeClientsRepository.create({
      contactName: 'John Doe',
      document: '00000000000100',
      phone: '00000000',
      socialReason: 'Social Reason',
    });
    const clientThree = await fakeClientsRepository.create({
      contactName: 'John Doe',
      document: '00000000000100',
      phone: '00000000',
      socialReason: 'Social Reason',
    });
    const clientFour = await fakeClientsRepository.create({
      contactName: 'John Doe',
      document: '00000000000100',
      phone: '00000000',
      socialReason: 'Social Reason',
    });

    const clients = await listClientsService.execute();

    clients.forEach(client => delete client.addresses);

    expect(clients).toEqual([
      clientOne,
      clientTwo,
      clientThree,
      clientFour,
    ]);
  });
});
