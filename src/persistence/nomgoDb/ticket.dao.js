import mongoose from "mongoose";
import config from "../../config/config.js";
import TicketDto from "../../dtos/ticket.dto.js";

mongoose.set("strictQuery", false);
mongoose.connect(config.MONGO_URL, { dbName: config.DB_NAME }, (error) => {
  if (error) {
    console.log("Cannot connect to db");
    process.exit();
  }
});

class UserDao {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  async getAll() {
    try {
      const tickets = await this.collection.find().lean();

      const list = tickets.map((ticket) => {
        return new TicketDto({
          id: ticket._id,
          code: ticket.code,
          purchase_datetime: ticket.purchase_datetime,
          amount: ticket.amount,
          purchase: ticket.purchase,
        });
      });

      return list;
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const ticket = await this.collection.findById(id);

      const ticketDto = new TicketDto({
        id: ticket._id,
        code: ticket.code,
        purchase_datetime: ticket.purchase_datetime,
        amount: ticket.amount,
        purchase: ticket.purchase,
      });
      return ticketDto;
    } catch (error) {
      throw error;
    }
  }

  async create(category) {
    try {
      const ticket = await this.collection.create(category);

      const ticketDto = new TicketDto({
        id: ticket._id,
        code: ticket.code,
        purchase_datetime: ticket.purchase_datetime,
        amount: ticket.amount,
        purchase: ticket.purchase,
      });
      return ticketDto;
    } catch (error) {
      throw error;
    }
  }

  async update(id, category) {
    try {
      const ticket = await this.collection.findOneAndUpdate({ _id: id }, category, { new: true });

      const ticketDto = new TicketDto({
        id: ticket._id,
        code: ticket.code,
        purchase_datetime: ticket.purchase_datetime,
        amount: ticket.amount,
        purchase: ticket.purchase,
      });
      return ticketDto;

    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const ticket = await this.collection.deleteOne({ _id: id });
      const ticketDto = new TicketDto({
        id: ticket._id,
        code: ticket.code,
        purchase_datetime: ticket.purchase_datetime,
        amount: ticket.amount,
        purchase: ticket.purchase,
      });
      return ticketDto;

    } catch (error) {
      console.log(error);
    }
  }
}

export default UserDao;
