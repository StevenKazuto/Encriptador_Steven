const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector(".mensaje");
const btn_copy = document.querySelector(".btn-copiar");

// funcion de redimensionamiento de la ventana
window.addEventListener("resize", function () {
  let input = document.getElementById("mensajeCopy");
  if (window.innerWidth <= 768) {
    input.placeholder =
      "Ningún mensaje fue encontrado \n" +
      "Ingresa el texto que desees encriptar o desencriptar.";
    input.style.backgroundImage = "none";
    btn_copy.style.visibility = "hidden";
    // Ejecutar código si el ancho de la ventana es mayor que 768px
  } else {
    input.placeholder = "";
    // Ejecutar otro código si el ancho de la ventana es menor o igual a 768px
  }
});

//Verificacion de permisos del portapapeles
navigator.permissions.query({ name: "clipboard-write" }).then((resultado) => {
  if (resultado.state == "granted" || resultado.state == "prompt") {
    alert("¡Permisos de escritura al portapapeles concedido!");
  }
});

//funcion del boton de encriptar con la funcion de encriptamiento interna
function btnEncriptar() {
  const textoEncriptado = encriptar(textArea.value);
  mensaje.value = textoEncriptado;
  textArea.value = "";
  mensaje.style.backgroundImage = "none";
  btn_copy.style.visibility = "visible";
}

function encriptar(stringEncriptada) {
  // La letra "e" es convertida para "enter"
  // La letra "i" es convertida para "imes"
  // La letra "a" es convertida para "ai"
  // La letra "o" es convertida para "ober"
  // La letra "u" es convertida para "ufat"

  let matrizCodigo = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
  ];

  //   console.table(matrizCodigo);
  stringEncriptada = stringEncriptada.toLowerCase();

  for (let i = 0; i < matrizCodigo.length; i++) {
    //recorre todo el contenido del textArea y veridica si algun caracter esta incluido en la matrizCodigo
    //para reemplazarla con el subindice siguiente
    if (stringEncriptada.includes(matrizCodigo[i][0])) {
      stringEncriptada = stringEncriptada.replaceAll(
        matrizCodigo[i][0],
        matrizCodigo[i][1]
      );
    }
  }
  return stringEncriptada;
}

function btndesEncriptar() {
  const textodesEncriptado = desEncriptar(textArea.value);
  mensaje.value = textodesEncriptado;
  textArea.value = "";
  mensaje.style.backgroundImage = "none";
  btn_copy.style.visibility = "visible";
}

function desEncriptar(stringdesEncriptada) {
  let matrizCodigo = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
  ];
  //   console.table(matrizCodigo);
  stringdesEncriptada = stringdesEncriptada.toLowerCase();

  for (let i = 0; i < matrizCodigo.length; i++) {
    if (stringdesEncriptada.includes(matrizCodigo[i][1])) {
      stringdesEncriptada = stringdesEncriptada.replaceAll(
        matrizCodigo[i][1],
        matrizCodigo[i][0]
      );
    }
  }
  return stringdesEncriptada;
}

const copiarContenido = async () => {
  navigator.clipboard.writeText(mensaje.value).then(
    () => {
      console.log("Contenido copiado al portapapeles");
      /* Resuelto - texto copiado al portapapeles con éxito */
    },
    () => {
      console.error("Error al copiar");
      /* Rechazado - fallo al copiar el texto al portapapeles */
    }
  );
};
