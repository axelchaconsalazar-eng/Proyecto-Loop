/* Js */

// Crear una publicación 
const formPublicacion = document.getElementById("form-publicacion");

if (formPublicacion) {
  const campoUsuario = document.getElementById("usuario");

  formPublicacion.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const usuario = campoUsuario.value.trim();
    const contenido = document.getElementById("contenido").value.trim();
    const lista = document.getElementById("categoria");
    const categoria = lista.options[lista.selectedIndex].text; // texto de la opción elegida
    const mensaje = document.getElementById("mensaje");

    // validación sencilla
    if (contenido.length < 10) {
      mensaje.textContent = "Escribe al menos 10 caracteres en tu publicación.";
      mensaje.className = "error";
      return;
    }

    // Trae las publicaciones guardadas
    const publicaciones = JSON.parse(localStorage.getItem("publicacionesLoop")) || [];

    // Agrega la nueva y vuelve a guardar todo
    publicaciones.push({ usuario: usuario, contenido: contenido, categoria: categoria });
    localStorage.setItem("publicacionesLoop", JSON.stringify(publicaciones));

    // Ir a la página de publicaciones para verla
    window.location.href = "publicaciones.html";
  });
}


// Publicaciones
const listaPublicaciones = document.getElementById("lista-publicaciones");

if (listaPublicaciones) {
  const guardadas = JSON.parse(localStorage.getItem("publicacionesLoop")) || [];

  guardadas.forEach(function (post) {
    const articulo = crearArticulo(post);
    listaPublicaciones.querySelector("h2").after(articulo); // la más nueva queda primero
  });

  // Agrega un "Me gusta" a todas las publicaciones
  const articulos = listaPublicaciones.querySelectorAll("article");

  articulos.forEach(function (articulo) {
    const boton = document.createElement("button");
    boton.textContent = "👍 Me gusta";
    const contador = articulo.querySelector(".contador");

    // Cada clic suma 1 al número 
    boton.addEventListener("click", function () {
      contador.textContent = Number(contador.textContent) + 1;
    });

    articulo.append(boton);
  });
}


// ---------- 3. FUNCIONES AYUDANTES ----------
// Crea un párrafo así: <p><strong>Etiqueta</strong> texto</p>
//function crearParrafo(etiqueta, texto) {
  //const parrafo = document.createElement("p");
  //parrafo.innerHTML = "<strong>" + etiqueta + "</strong> ";
  //parrafo.append(texto);
  //return parrafo;
//} //

// Crea una publicación completa con los datos recibidos
function crearArticulo(post) {
  const articulo = document.createElement("article");

  const titulo = document.createElement("h3");
  titulo.textContent = "Publicación de " + post.usuario;

  const contenido = document.createElement("p");
  contenido.textContent = post.contenido;

  const meGusta = document.createElement("p");
  meGusta.innerHTML = '<strong>Me gusta:</strong> <span class="contador">0</span>';

  articulo.append(
    titulo,
    crearParrafo("Usuario:", post.usuario),
    crearParrafo("Categoría:", post.categoria),
    contenido,
    meGusta
  );
  return articulo;
}