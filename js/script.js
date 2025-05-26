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
               <button>Editar</button>
               <button>Eliminar</button>
           </td>

        </tr>
    `
  });

}
//llamda inicial para que se carquen los datos que vienen del servidor
obtenerPersonas();