const listaNombres = document.querySelector("#listaNombres");
const inputNombre = document.querySelector("#inputNombre");
const inputEdad = document.querySelector("#inputEdad");
const inputTelefono = document.querySelector("#inputTelefono");
const formClientes = document.querySelector("#formClientes");
const datosCliente = document.querySelector("#datosCliente");

let nuevoCliente;
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

const editarNuevoCliente = (input) => {
  const { name, value } = input;
  nuevoCliente = {
    ...nuevoCliente,
    [name]: value,
  };
};

inputNombre.oninput = () => {
  editarNuevoCliente(inputNombre);
  console.log(nuevoCliente);
};

inputEdad.oninput = () => {
  editarNuevoCliente(inputEdad);
  console.log(nuevoCliente);
};

inputTelefono.oninput = () => {
  editarNuevoCliente(inputTelefono);
  console.log(nuevoCliente);
};

formClientes.onsubmit = (event) => {
  event.preventDefault();
  nuevoCliente = {
    ...nuevoCliente,
    id: Date.now().toString(36)
  }
  clientes = [...clientes, nuevoCliente];

  localStorage.setItem("clientes", JSON.stringify(clientes));
  listarClientes();
  formClientes.reset();
};

const listarClientes = () => {
  listaNombres.innerHTML = " ";
  
  let option = document.createElement("option");
  option.innerHTML = "Clientes";
  listaNombres.appendChild(option);

  clientes.forEach((cliente) => {
    let option = document.createElement("option");
    const { nombre, id } = cliente;
    option.innerHTML = nombre;
    option.value = id;

    listaNombres.appendChild(option);
  });
};

listarClientes();

listaNombres.onchange = (event) => {
  let id = event.target.value
  mostrarDatosCliente(id);
}

const mostrarDatosCliente = (id) => {
  datosCliente.innerHTML = " ";

  const clienteBuscado = clientes.find((cliente) => cliente.id === id);

  let div = document.createElement("div");
  
  if (!clienteBuscado) return (div.innerHTML = " ");

  const { nombre, edad, telefono } = clienteBuscado;

  div.innerHTML = `
    <p>Nombre: ${nombre}</p>
    <p>Edad: ${edad}</p>
    <p>Telefono: ${telefono}</p>
    `;

  let btnEliminar = document.createElement("button");
  btnEliminar.innerHTML = "Eliminar";
  div.appendChild(btnEliminar);

  btnEliminar.onclick = () => eliminarCliente(id);
  datosCliente.appendChild(div);
}

const eliminarCliente = (id) => {
  clientes = clientes.filter((cliente) => cliente.id !== id);
  localStorage.setItem("clientes", JSON.stringify(clientes));
  mostrarDatosCliente(id);
  listarClientes();
};

