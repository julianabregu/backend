const socket = io();

socket.emit("mensaje", [{ user: "Fran", mensaje: "Hola" }]);

socket.on("mensaje-general", (info) => {
  console.log(info);
});

socket.on("mensaje-socket-propio", (info) => {
  console.log(info);
});
