import TicketDao from "../repositories/ticket.repository.js";

const daos = {
  fileSystem: null,
  mongoose: TicketDao,
};

class TicketDaoFactory {
  static create(daoKey) {
    return new daos[daoKey]();
  }
}

export default TicketDaoFactory;
