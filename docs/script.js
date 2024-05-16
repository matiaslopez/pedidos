

// // Función para analizar el texto y extraer las ofertas por categoría
// function parsearTexto(texto) {
//     // Dividir el texto en líneas
//     const lineas = texto.split('\n');

//     // Objeto para almacenar las ofertas por categoría
//     const ofertasPorCategoria = {
//         Verduras: [],
//         Frutas: [],
//         Huevos: [],
//         Envasados: []
//     };

//     // Variable para rastrear la categoría actual mientras analizamos el texto
//     let categoriaActual = '';

//     // Recorrer cada línea del texto
//     lineas.forEach((linea) => {
//         // Verificar si la línea corresponde a una categoría
//         if (linea.startsWith('Verduras') || linea.startsWith('Frutas') || linea.startsWith('Huevos') || linea.startsWith('Envasados')) {
//             // Asignar la categoría actual
//             categoriaActual = linea.trim();
//         } else if (linea.startsWith('-')) {
//             // Agregar la oferta a la categoría actual
//             const oferta = linea.slice(1).trim();
//             ofertasPorCategoria[categoriaActual].push(oferta);
//         }
//     });

//     return ofertasPorCategoria;
// }


// Función para analizar el texto pegado y extraer los productos por categoría
function parsearTexto(texto) {
    // Dividir el texto en líneas
    const lineas = texto.split('\n');

    // Objeto para almacenar los productos por categoría
    const productosPorCategoria = {};

    // Variable para rastrear la categoría actual mientras analizamos el texto
    let categoriaActual = '';

    // Recorrer cada línea del texto
    lineas.forEach((linea) => {
        // Eliminar espacios en blanco al principio y al final de la línea
        linea = linea.trim();

        // Verificar si la línea es una categoría
        if (linea.startsWith('-')) {
            // Verificar si hay una categoría previamente definida
            if (categoriaActual) {
                // Verificar si la categoría ya existe en el objeto
                if (!productosPorCategoria.hasOwnProperty(categoriaActual)) {
                    // Si la categoría no existe, inicializarla como un array vacío
                    productosPorCategoria[categoriaActual] = [];
                }

                // Agregar el producto a la categoría correspondiente
                productosPorCategoria[categoriaActual].push(linea.slice(1).trim());
            }
        } else if (linea) {
            // Si la línea no es una categoría ni está en blanco, asumir que es el nombre de la categoría
            categoriaActual = linea;
        }
    });

    return productosPorCategoria;
}



// Función para generar dinámicamente los checkboxes en la segunda página
function generarCheckboxes(ofertasPorCategoria) {
    const formCheckboxes = document.getElementById('formCheckboxes');
    const listaNoSeleccionados = document.getElementById('listaNoSeleccionados');

    // Objeto para almacenar los checkboxes por categoría
    const checkboxesPorCategoria = {};

    // Recorrer cada categoría en el objeto de ofertas
    for (const categoria in ofertasPorCategoria) {
        if (ofertasPorCategoria.hasOwnProperty(categoria)) {
            const productos = ofertasPorCategoria[categoria];

            // Array para almacenar los checkboxes de la categoría
            const checkboxesCategoria = [];

            // Crear un contenedor para la categoría
            const categoriaContainer = document.createElement('div');
            categoriaContainer.classList.add('categoria-container');

            // Crear un título para la categoría
            const categoriaTitle = document.createElement('h2');
            categoriaTitle.textContent = categoria;
            categoriaContainer.appendChild(categoriaTitle);

            // Crear una lista para los checkboxes de la categoría
            const listaCheckboxes = document.createElement('ul');
            categoriaContainer.appendChild(listaCheckboxes);

            // Recorrer cada producto en la categoría
            productos.forEach(producto => {
                // Crear un elemento de lista para el checkbox y la etiqueta
                const listItem = document.createElement('li');

                // Crear un checkbox para el producto
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = producto;
                checkbox.value = producto;
                checkbox.checked = true; // Marcado por defecto

                // Crear una etiqueta para el checkbox
                const label = document.createElement('label');
                label.textContent = producto;

                // Agregar el checkbox y la etiqueta al elemento de lista
                listItem.appendChild(checkbox);
                listItem.appendChild(label);

                // Agregar el elemento de lista a la lista de checkboxes de la categoría
                listaCheckboxes.appendChild(listItem);

                // Agregar el checkbox al array de checkboxes de la categoría
                checkboxesCategoria.push({ checkbox, label });

                // Agregar un listener para el evento change en los checkboxes
                checkbox.addEventListener('change', function() {
                    if (!checkbox.checked) {
                        // Si el checkbox fue deseleccionado, mover el elemento a la lista de no seleccionados
                        listaNoSeleccionados.appendChild(listItem);
                    } else {
                        // Si el checkbox fue seleccionado, mover el elemento de vuelta a su categoría
                        listaCheckboxes.appendChild(listItem);
                    }
                });
            });

            // Almacenar los checkboxes de la categoría en el objeto
            checkboxesPorCategoria[categoria] = checkboxesCategoria;

            // Agregar el contenedor de la categoría al formulario
            formCheckboxes.appendChild(categoriaContainer);
        }
    }
}


// Función para analizar el texto pegado y llenar las categorías en la segunda página
function procesarTextoIngresado(texto) {
    // Analizar el texto pegado para obtener los productos por categoría
    const productosPorCategoria = parsearTexto(texto);

    // Llenar las categorías en la segunda página
    generarCheckboxes(productosPorCategoria);
}

// // Obtener el campo de texto de la primera página
// const campoTexto = document.getElementById('campoTexto');

// // Agregar un listener para el evento de pegar texto en el campo de texto
// campoTexto.addEventListener('input', function() {
//     // Obtener el texto pegado en el campo de texto
//     const textoPegado = campoTexto.value;

//     // Procesar el texto pegado para llenar las categorías en la segunda página
//     procesarTextoIngresado(textoPegado);
// });



document.getElementById('continuarBtn').addEventListener('click', function() {
    // Obtener las páginas
    var paginaActual = document.querySelector('.pagina-actual');
    var paginaSiguiente = paginaActual.nextElementSibling;

    // Agregar y remover clases para animar el desplazamiento
    // paginaActual.classList.remove('pagina-actual');
    // paginaActual.classList.add('pagina-siguiente');
    // paginaSiguiente.classList.add('pagina-actual');

    // Obtener el campo de texto de la primera página
    const campoTexto = document.getElementById('textoInput');
    console.log(campoTexto)
    // Obtener el texto pegado en el campo de texto
    const textoPegado = campoTexto.value;

    // Procesar el texto pegado para llenar las categorías en la segunda página
    procesarTextoIngresado(textoPegado);
});


// Función para generar el enlace de WhatsApp con los elementos seleccionados
function generarLinkWhatsApp() {
    // Obtener todos los checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Array para almacenar los elementos seleccionados
    const elementosSeleccionados = [];

    // Recorrer los checkboxes
    checkboxes.forEach(checkbox => {
        // Verificar si el checkbox está seleccionado
        if (checkbox.checked) {
            // Obtener el texto del elemento asociado al checkbox
            const textoElemento = checkbox.nextSibling.textContent.trim();
            // Agregar el texto del elemento al array de elementos seleccionados
            elementosSeleccionados.push(textoElemento);
        }
    });

    // Construir la lista de elementos seleccionados como una cadena de texto separada por comas
    const listaElementos = elementosSeleccionados.join(', ');

    // Número de teléfono de WhatsApp (sustituye '0123456789' por el número de teléfono real)
    const telefono = '0123456789';

    // Texto del mensaje (sustituye 'pedido' por la lista de elementos seleccionados)
    const mensaje = encodeURIComponent(listaElementos);

    // Construir el enlace de WhatsApp
    const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=${mensaje}`;

    // Redirigir al enlace de WhatsApp
    console.log(enlaceWhatsApp);
    // window.location.href = enlaceWhatsApp;
}

// Obtener el botón de generar link
const btnGenerarLink = document.getElementById('enviarBtn');

// Agregar un listener para el evento click en el botón de generar link
btnGenerarLink.addEventListener('click', generarLinkWhatsApp);




// // Ejemplo de uso
// const textoEjemplo = `➡️ Estás son nuestras ofertas disponibles hasta agotar stock\n
// 👉Para realizar tu pedido envíanos una lista con los artículos indicando, si es para envío, la dirección de tu domicilio, si es para retirar, la sucursal de retiro, para terminar envía otro mensaje con la palabra Finalizado\n
// ~ envíos\n
// 💲costo: $1000\n
// 💲compra mínima: $7000\n
// 💵~Pagos en efectivo 5% de descuento\n
// Verduras\n
// -🥬Acelga 4paq $3800\n
// -🧄Ajo 2cab $1200\n
// (...)`;

// const ofertas = parsearTexto(textoEjemplo);
// generarCheckboxes(ofertas);






// // Ejemplo de uso
// const textoEjemplo = `➡️ Estás son nuestras ofertas disponibles hasta agotar stock\n
// 👉Para realizar tu pedido envíanos una lista con los artículos indicando, si es para envío, la dirección de tu domicilio, si es para retirar, la sucursal de retiro, para terminar envía otro mensaje con la palabra Finalizado\n
// ~ envíos\n
// 💲costo: $1000\n
// 💲compra mínima: $7000\n
// 💵~Pagos en efectivo 5% de descuento\n
// Verduras\n
// -🥬Acelga 4paq $3800\n
// -🧄Ajo 2cab $1200\n
// (...)`;

// const ofertas = parsearTexto(textoEjemplo);
// console.log(ofertas);
