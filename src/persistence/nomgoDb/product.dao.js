import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import config from "../../config/config.js";
import ProductDto from "../../dtos/product.dto.js";

mongoose.set("strictQuery", false);
mongoose.connect(config.MONGO_URL, { dbName: config.DB_NAME }, (error) => {
  if (error) {
    console.log("Cannot connect to db");
    process.exit();
  }
});

class ProductDao {
  constructor(collection, schema) {
    schema.plugin(mongoosePaginate);
    this.collection = mongoose.model(collection, schema);
  }

  async getAll(limit = 10, page = 1, sort, query = null) {
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      lean: true,
      sort: { price: sort === "asc" ? 1 : -1 },
    };

    const queryParams = query ? { category: query, stock: { $gt: 0 } } : { stock: { $gt: 0 } };

    const queryValue = query ? `&query=${query}` : "";

    try {
      const pagination = await this.collection.paginate(queryParams, options);

      const resp = {
        status: "success",
        payload: pagination.docs.map((prod) => {
          return new ProductDto({
            id: prod._id,
            title: prod.title,
            description: prod.description,
            code: prod.code,
            price: prod.price,
            status: prod.status,
            stock: prod.stock,
            category: prod.category,
            thumbnail: prod.thumbnail,
          });
        }),
        totalPages: pagination.totalPages,
        prevPage: pagination.prevPage,
        nextPage: pagination.nextPage,
        page: pagination.page,
        hasPrevPage: pagination.hasPrevPage,
        hasNextPage: pagination.hasNextPage,
        prevLink: pagination.hasPrevPage
          ? `api/products/list?limit=${limit}&page=${pagination.prevPage}&sort=${sort}${queryValue}`
          : null,
        nextLink: pagination.hasNextPage
          ? `api/products/list?limit=${limit}&page=${pagination.nextPage}&sort=${sort}${queryValue}`
          : null,
      };

      return resp;
    } catch (error) {
      const resp = {
        status: "error",
        payload: null,
        totalPages: 0,
        prevPage: null,
        nextPage: null,
        page: null,
        hasPrevPage: false,
        hasNextPage: false,
        prevLink: null,
        nextLink: null,
      };
      throw resp;
    }
  }

  async findById(id) {
    try {

      const prod = await this.collection.findById(id);
      const productDto = new ProductDto({
        id: prod._id,
        title: prod.title,
        description: prod.description,
        code: prod.code,
        price: prod.price,
        status: prod.status,
        stock: prod.stock,
        category: prod.category,
        thumbnail: prod.thumbnail,
      });

      return productDto;
    } catch (error) {
      throw error;
    }
  }

  async create(product) {
    try {
      let prod = await this.collection.create(product);

      const productDto = new ProductDto({
        id: prod._id,
        title: prod.title,
        description: prod.description,
        code: prod.code,
        price: prod.price,
        status: prod.status,
        stock: prod.stock,
        category: prod.category,
        thumbnail: prod.thumbnail,
      });
      return(productDto);

    } catch (error) {
      throw error;
    }
  }

  async update(id, product) {
    try {
      let prod = await this.collection.findOneAndUpdate({ _id: id }, product, {
        new: true,
      });

      const productDto = new ProductDto({
        id: prod._id,
        title: prod.title,
        description: prod.description,
        code: prod.code,
        price: prod.price,
        status: prod.status,
        stock: prod.stock,
        category: prod.category,
        thumbnail: prod.thumbnail,
      });
      return(productDto);

    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      let prod = await this.collection.deleteOne({ _id: id });

      const productDto = new ProductDto({
        id: prod._id,
        title: prod.title,
        description: prod.description,
        code: prod.code,
        price: prod.price,
        status: prod.status,
        stock: prod.stock,
        category: prod.category,
        thumbnail: prod.thumbnail,
      });
      
      return(productDto);

    } catch (error) {
      throw error;
    }
  }
}

export default ProductDao;
