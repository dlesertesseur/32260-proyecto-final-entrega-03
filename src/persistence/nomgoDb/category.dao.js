import mongoose from "mongoose";
import config from "../../config/config.js";
import CategoryDto from "../../dtos/category.dto.js";
import categorySchema from "../../models/category.model.js";

mongoose.set("strictQuery", false);
mongoose.connect(config.MONGO_URL, { dbName: config.DB_NAME }, (error) => {
  if (error) {
    console.log("Cannot connect to db");
    process.exit();
  }
});

class CategoryDao {
  constructor() {
    this.collection = mongoose.model("categories", categorySchema);
  }

  async getAll() {
    try {
      const categories = await this.collection.find().lean();

      const list = categories.map((cat) => {
        return (new CategoryDto(cat));
      });

      return(list);
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const cat = await this.collection.findById(id);
      const categoryDto = new CategoryDto(cat);

      return categoryDto;
    } catch (error) {
      throw error;
    }
  }

  async create(category) {
    try {
      const cat = await this.collection.create(category);
      const categoryDto = new CategoryDto(cat)

      return categoryDto;
    } catch (error) {
      throw error;
    }
  }

  async update(id, category) {
    try {
      const cat = await this.collection.findOneAndUpdate({ _id: id }, category, {new: true,});
      const categoryDto = new CategoryDto(cat);

      return categoryDto;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const cat = await this.collection.deleteOne({ _id: id });
      const categoryDto = new CategoryDto(cat)

      return categoryDto;
    } catch (error) {
      console.log(error);
    }
  }
}

export default CategoryDao;
