import { promises as fs } from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async addProduct(product) {
    try {
      let content = await fs.readFile(this.path, "utf-8");
      content = JSON.parse(content);
      if (content.length === 0) {
        product.id = 1;
      } else {
        const newId = content[content.length - 1].id + 1;
        product.id = newId;
      }
      content.push(product);
      await fs.writeFile(this.path, JSON.stringify(content));
    } catch (error) {
      console.log(error);
    }
  }

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
