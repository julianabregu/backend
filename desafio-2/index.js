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
    console.log(content);
  };

  getProductById = async (id) => {
    let content = await this.readProducts();
    if (!content.find((product) => product.id === id)) {
      console.log("[ERROR] Id not found");
    } else {
      console.log(content.find((product) => product.id === id));
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

const productManager = new ProductManager("./products.txt");

// await productManager.getProducts();

// await productManager.addProduct(
//   "Salomon shoe",
//   "Outdoor shoes",
//   42399,
//   "img-1",
//   "HSK27X",
//   6
// );

// await productManager.addProduct(
//   "Nike t-shirt",
//   "Running clothes",
//   9899,
//   "img-2",
//   "HSKXCX",
//   12
// );

// await productManager.addProduct(
//   "Puma shoe",
//   "Running shoes",
//   47999,
//   "img-3",
//   "DSJF2B",
//   8
// );

// await productManager.getProducts();
// await productManager.getProductById(2);
// await productManager.deleteProductById(3);
// await productManager.getProducts();
// await productManager.updateProduct({
//   id: 1,
//   title: "Vans",
//   description: "Urban Shoes",
//   price: 20000,
//   thumbnail: "img-9",
//   code: "2KMVC3",
//   stock: 30,
// });
// await productManager.getProductById(1);
// await productManager.getProducts();
