const socket = io();

const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", e => {
 // e.preventDefault();

  const producto = {
    description: formulario[0].value,
    price: formulario[1].value,
    thumbnail: formulario[2].value
  };
  socket.emit("registro", producto);

  productForm.reset();
});

socket.on("productos", products =>{
  const tableContent = products
    .map(
      (product) =>
        `
    
      <tr scope="row">
      <td class="table-dark text-center">${product.description}</td>
      <td class="table-dark text-center">${product.price}</td>
      <td class="table-dark text-center"><img style="width:6vw;" class="img-thumbnail" src=${product.thumbnail}></td>
      </tr>
    
    `
    )
    .join(" ");
  document.querySelector("#tableBody").innerHTML=tableContent;
});

const user = document.getElementById("user");
const messages = document.getElementById("message");
const send = document.getElementById("send");
const messageForm = document.getElementById("messageForm");

user.addEventListener("input", () =>{
  if(user.value.length > 0){
    messages.disabled=false;
    send.disabled=false;
  }
})

messageForm.addEventListener("submit", e => {
 // e.preventDefault();

    const msg = {
      autor: user.value,
      text: messages.value,
    };
  socket.emit("mensajeNuevo", msg)
  messageForm.reset();
  message.focus();
})

socket.on("mensajes", (messages) => {
  const listaMensajes = messages.map((msg) =>
  `
    <div>
      <b style="color:blue;">${msg.autor}</b>
      [<span style="color:brown;">${msg.fyh}</span>] :
      <i style="color:green;">${msg.text}</i>
    </div>
  `
    ).join(" ");
  document.getElementById("contMensajes").innerHTML=listaMensajes;
});

