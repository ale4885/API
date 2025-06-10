//URL de la API
const  API_URL = "https://retoolapi.dev/Xxxjnd/data";


//funcion que manda a traer el JSON
async function obtenerPersonas(){
    //Respuesta del servidor
    const res = await  fetch(API_URL)//se hace una llamda al endpoint

    //pasamos a JSON  la respuesta del servidor
    const data = await res.json();//esto es un JSON

    //Enviamso el JSOn QUE nos  manda la api a la funcion qeu crea la tabla en html
    mostrarDatos(data);
}

//la funcion lleva un parametro "datos" que representa al JSON
function mostrarDatos(datos){
    //se llama al tbody dentro del elemento con id "tabla"
  const tabla = document.querySelector('#tabla tbody');

  //para inyectar codigo html usamos innerHTML
  tabla.innerHTML = '';//vacimos el contenido de la tabla

  datos.forEach(persona => {
    tabla.innerHTML += `
       <tr>
           <td>${persona.id}</td>
           <td>${persona.nombre}</td>
           <td>${persona.apellido}</td>
           <td>${persona.email}</td>
           <td>${persona.edad}</td>
           <td>
              <button onClick= "AbrirModalEditar(${persona.id}, '${persona.nombre}', '${persona.apellido}', '${persona.email}', '${persona.edad}')">Editar</button>
              <button onClick="EliminarPersona(${persona.id})">Eliminar</button>
           </td>

        </tr>
    `
  });

}
//llamda inicial para que se carquen los datos que vienen del servidor
obtenerPersonas();



//Agregar un nuevo registro
const modal = document.getElementById("modal-agregar");// cuadrp de dialogo
const  btnAgregar = document.getElementById("btnAbriModal");//+ para abrir
const  btnCerrar = document.getElementById("btnCerrarModal");//x para cerrar

btnAgregar.addEventListener("click", () => {
  modal.showModal(); //abrir el modal al hacer clic en el boton
});

btnCerrar.addEventListener("click", () => {
  modal.close();//cerrar nodal
});

//agregar nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
  e.preventDefault();// "e" represemta "sumbit"- Evita que el formulario se envie de golpe

  //capturar los valores del formulario
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const email = document.getElementById("email").value.trim();
  const edad = document.getElementById("edad").value.trim();

  //validecion basica
  if(!nombre || !apellido || !email || !edad){
    alert("complete todos los campos")
    return;//Evitar que el formulario se envie
  }


  //llamar a la API para enviar el usuario
  const respuesta = await fetch(API_URL, {
    method: "POST", 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({nombre, apellido, email, edad})
  });

  if(respuesta.ok){
    alert("El resgistro fue agregado correctamente");
    

    //Limpiar el formulario y cerra el modal
    document.getElementById("frmAgregar").reset();

    modal.close();

    //Recargar la tabla
    obtenerPersonas();
  }
  else{
    alert("Hubo un error al argregar");
  }


});



//Funcion para borrar registros
async function EliminarPersona(id){
  const confirmacion = confirm("Realmente deseas eliminar el registro");

  //validamos si el usuario dijo que si desea borrar
  if(confirmacion){
    await fetch(`${API_URL}/${id}`, {method: "DELETE"});


    //recargamos la tabla para ver la eliminacion
    obtenerPersonas();

  }
}


//Proceso para editar un registro
const modalEditar = document.getElementById("modal-editar");
const btnCerrarEditar  = document.getElementById("btnCerrarEditar");


btnCerrarEditar.addEventListener("click", () => {
  modalEditar.close();//cerrar nodal de Editar
});


function AbrirModalEditar(id ,  nombre , apellido ,email , edad){
  //Se agregan los valores del registro en los input
  document.getElementById("idEditar").value = id;
  document.getElementById("nombreEditar").value = nombre;
  document.getElementById("apellidoEditar").value = apellido;
  document.getElementById("emailEditar").value = email;
  document.getElementById("edadEditar").value = edad;

  modalEditar.showModal(); //modal se abre despues de agregar los valores a los input
}



document.getElementById("frmEditar").addEventListener("submit", async e=>{
  e.preventDefault();//Evita que el formulario se envie

  const id = document.getElementById("idEditar").value.trim();
  const nombre = document.getElementById("nombreEditar").value.trim();
  const apellido = document.getElementById("apellidoEditar").value.trim();
  const email = document.getElementById("emailEditar").value.trim();
  const edad = document.getElementById("edadEditar").value.trim();


  if(! id || !nombre || !apellido || !email || !edad){
    alert("Complete todos los campos");
    return; //Evita que el codigo se siga ejecutando
  }


  //Llamada a la API
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({edad, email , nombre , apellido})
  });


  if(respuesta.ok){
    alert("Resgistro actualizado con exito"); //Confirmacion
    modalEditar.close(); //Cerramos el modal
    obtenerPersonas(); //Actualizamos la lista 
  }
  else{
    alert("Hubo un erro al actualizar");
  }


});