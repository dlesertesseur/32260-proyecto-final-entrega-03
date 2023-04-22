import mongoose from "mongoose";
import config from "../../config/config.js";
import TicketDto from "../../dtos/ticket.dto.js";
import ticketSchema from "../../models/ticket.model.js";

mongoose.set("strictQuery", false);
mongoose.connect(config.MONGO_URL, { dbName: config.DB_NAME }, (error) => {
  if (error) {
    console.log("Cannot connect to db");
    process.exit();
  }
});

class TicketDao {
  constructor() {
    this.collection = mongoose.model("tickets", ticketSchema);
  }

  async getAll() {
    try {
      const tickets = await this.collection.find().lean();

      const list = tickets.map((ticket) => {
        return new TicketDto(ticket);
      });

      return list;
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const ticket = await this.collection.findById(id);
      const ticketDto = new TicketDto(ticket);
      return ticketDto;
    } catch (error) {
      throw error;
    }
  }

  async create(category) {
    try {
      const ticket = await this.collection.create(category);
      const ticketDto = new TicketDto(ticket);
      return ticketDto;
    } catch (error) {
      throw error;
    }
  }

  async update(id, category) {
    try {
      const ticket = await this.collection.findOneAndUpdate({ _id: id }, category, { new: true });
      const ticketDto = new TicketDto(ticket);
      return ticketDto;

    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const ticket = await this.collection.deleteOne({ _id: id });
      const ticketDto = new TicketDto(ticket);
      return ticketDto;

    } catch (error) {
      console.log(error);
    }
  }
}

export default TicketDao;
