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
      return `This product does not exist.`;
    }
  };

  deleteProductById = async (id) => {
    let content = await this.readProducts();
    let deleteById = content.filter((product) => product.id != id);

    if (!content.find((product) => product.id === id)) {
      return `Error this product doesn't exist`;
    } else {
      await fs.writeFile(this.path, JSON.stringify(deleteById));
      return `Product deleted`;
    }
  };

  updateProduct = async (
    id,
    { title, description, code, price, status, stock, category, thumbnails }
  ) => {
    let content = await this.readProducts();

    if (content.some((product) => product.id === parseInt(id))) {
      let index = content.findIndex((product) => product.id === parseInt(id));
      content[index].title = title;
      content[index].description = description;
      content[index].code = code;
      content[index].price = price;
      content[index].status = status;
      content[index].stock = stock;
      content[index].category = category;
      content[index].thumbnails = thumbnails;
      await fs.writeFile(this.path, JSON.stringify(content));
      return "Product updated";
    } else {
      return "Error product id is not valid.";
    }
  };
}

export default ProductManager;
