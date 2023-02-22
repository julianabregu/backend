const socket = io();

const div = document.getElementById("products");

socket.on("products", (data) => {
  div.innerHTML = "";
  data.forEach((product) => {
    const productList = document.createElement("ul");
    productList.innerHTML = `
    <li>${product.title}</li>
    <li>${product.description}</li>
    <li>${product.code}</li>
    <li>${product.price}</li>
    <li>${product.status}</li>
    <li>${product.stock}</li>
    <li>${product.category}</li>
    <li>${product.thumbnails}</li>
    <li>${product.id}</li>
    `;

    div.appendChild(productList);
  });
});
