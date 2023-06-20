const socket = io();

//agregar mensaje

const form3 = document.getElementById("chatForm");

form3.addEventListener("submit", (event) => {
  event.preventDefault();

  const usuario = form3.elements.usuario.value;
  const mensaje = form3.elements.mensaje.value;
  
  console.log(event);
  socket.emit("nuevoChat", { usuario,mensaje });
});


socket.on("actualizarChat", (data) => {
  renderizarChat(data);
});
//render Chat
const renderizarChat = (data) => {
  const tbody = document.getElementById("chatDisplay");

  const productsMap = data
    .map((item) => {
      return `<tr>
  <th scope="row">${item.id}</th>
  <td>${item.usuario}</td>
  <td>${item.mensaje}</td>
  </tr>
  `;
    })
    .join("");
  tbody.innerHTML = productsMap;
}
