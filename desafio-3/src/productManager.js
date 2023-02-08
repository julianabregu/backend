import { promises as fs } from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.id = 0;
  }

  static addId() {
    if (this.idIncrement) {
      this.idIncrement++;
    } else {
      this.idIncrement = 1;
    }
    return this.idIncrement;
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    let newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: ProductManager.addId(),
    };
    this.products.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(this.products));
  };

  readProducts = async () => {
    let content = await fs.readFile(this.path, "utf-8");
    return JSON.parse(content);
  };

  getProducts = async () => {
    let content = await this.readProducts();
    return content;
  };

  getProductById = async (pid) => {
    let content = await this.readProducts();
    let getById = content.find((prod) => prod.id === pid);
    if (getById) {
      return getById;
    } else {
      return null;
    }
  };

  deleteProductById = async (id) => {
    let content = await this.readProducts();
    let deleteById = content.filter((product) => product.id != id);

    if (!content.find((product) => product.id === id)) {
      console.log(`[ERROR] Product ${id} doesn't exist`);
    } else {
      await fs.writeFile(this.path, JSON.stringify(deleteById));
    }
  };

  updateProduct = async ({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    id,
  }) => {
    let content = await this.readProducts();

    if (content.some((product) => product.id === id)) {
      let index = content.findIndex((product) => product.id == id);
      content[index].title = title;
      content[index].description = description;
      content[index].price = price;
      content[index].thumbnail = thumbnail;
      content[index].code = code;
      content[index].stock = stock;
      await fs.writeFile(this.path, JSON.stringify(content));
    } else {
      console.log("[ERROR] Product id is not valid.");
    }
  };
}

export default ProductManager;
