const socket = io();

const productsTable = document.getElementById("productsTable");

socket.on("messageGetProducts:", (data) => {
  productsTable.innerHTML = "";
  data.forEach((product) => {
    productsTable.innerHTML += ` 
      <tr>
      <th scope="row">${product.id}</th>
      <td>${product.title}</td>
      <td>${product.description}</td>
      <td>${product.code}</td>
      <td>${product.price}</td>
      <td>${product.status}</td>
      <td>${product.stock}</td>
      <td>${product.category}</td>
      <td>${product.thumbnails}</td>
      </tr>
      `;
  });
});

const formCreateProduct = document.getElementById("formCreateProduct");

formCreateProduct.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const price = document.getElementById("price").value;
  const status = document.getElementById("status").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;
  const thumbnails = document.getElementById("thumbnails").value;

  const newProduct = {
    title,
    description,
    code,
    price: Number(price),
    status: Boolean(status),
    stock: Number(stock),
    category,
    thumbnails: Array(thumbnails),
  };

  socket.emit("messageNewProduct:", newProduct);
});

const formDeleteProduct = document.getElementById("formDeleteProduct");

formDeleteProduct.addEventListener("submit", (event) => {
  event.preventDefault();
  const idProduct = document.getElementById("idProduct").value;
  const idProductParse = Number(idProduct);

  socket.emit("messageDeleteProduct:", idProductParse);
});
