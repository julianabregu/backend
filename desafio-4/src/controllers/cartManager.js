import { promises as fs } from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
    this.cart = [];
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

  readCart = async () => {
    let content = await fs.readFile(this.path, "utf-8");
    return JSON.parse(content);
  };

  addCart = async () => {
    let newCart = {
      id: CartManager.addId(),
      products: [],
    };
    this.cart.push(newCart);
    await fs.writeFile(this.path, JSON.stringify(this.cart));
    return "New cart added";
  };

  getCartById = async (cid) => {
    let content = await this.readCart();
    let getById = content.find((cart) => cart.id === cid);
    if (getById) {
      return getById;
    } else {
      return `This cart does not exist.`;
    }
  };

  addToCart = async (productId, quantity) => {
    let addById = {
      productId,
      quantity,
    };
    this.products.push(addById);
    await fs.writeFile(this.path, JSON.stringify(this.products));
    return "New product added";
  };
}

export default CartManager;
