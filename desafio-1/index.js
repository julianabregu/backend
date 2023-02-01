class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  getId() {
    return this.products.length + 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const repeatedCode = this.products.some((e) => e.code === code);

    let newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: this.getId(),
    };

    if (repeatedCode) {
      console.log("[ERROR] el codigo esta repetido");
    } else {
      this.products.push(newProduct);
    }
  }

  getProductsById(id) {
    let findProduct = this.products.find((e) => e.id === id);
    return findProduct === undefined ? "Id Not Found" : findProduct;
  }
}

const productManager = new ProductManager();

productManager.addProduct(
  "Saucony Shoes",
  "Running Shoes",
  49990,
  "https://drive.google.com/file/d/1KGDhAmckUz3gL472ANYegNHdRGwIqH7y/view?usp=share_link",
  "KSDJU2",
  5
);

productManager.addProduct(
  "Nike T-Shirt",
  "Running Clothes",
  6999,
  "https://drive.google.com/file/d/1zOFqRA1xoo80H2H1-v-PSE4EITxc3Iwf/view?usp=share_link",
  "KM5WP2",
  10
);

productManager.addProduct(
  "Adidas Short",
  "Running Clothes",
  3999,
  "https://drive.google.com/file/d/1zOFqRA1xoo80H2H1-v-PSE4EITxc3Iwf/view?usp=share_link",
  "LXMFD2",
  10
);

productManager.addProduct(
  "Nike T-Shirt",
  "Running Clothes",
  6999,
  "https://drive.google.com/file/d/1zOFqRA1xoo80H2H1-v-PSE4EITxc3Iwf/view?usp=share_link",
  "KM5WP2",
  10
);

console.log(productManager.getProducts());
console.log(productManager.getId());
console.log(productManager.getProductsById(3));
