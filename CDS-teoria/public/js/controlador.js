var db;

(function() {
    if (!('indexedDB' in window)) {
        console.err("El navegador no soporta indexedDB");
        return;
    }

    var solicitud = window.indexedDB.open("Examen", 1);

    solicitud.onsuccess = function(evento) {
        db = solicitud.result;
        console.log("Se abrio o se creo la BD");
        LlenarCategorias();
        llenarSelectCategorias()






        ; //NO tengo idea porque falla al llamarlo en el onupgradeneeded
        llenarAgregados();
    }

    solicitud.onerror = function(evento) {
        console.error(evento);
    }

    solicitud.onupgradeneeded = function(evento) {
        console.log('Se creo o actualizo la BD');

        db = evento.target.result; //Obtener referencia de la BD creada
        //Crear contenedores de objetos (ObjectStores)
        var objectStoreCategorias = db.createObjectStore("categorias", { keyPath: "codigo", autoIncrement: true });
        objectStoreCategorias.transaction.oncomplete = function(evento) {
            console.log("El object store de categorias se creo con exito");
        }
        objectStoreCategorias.transaction.onerror = function(evento) {
            console.log("Error al crear el object store de categorias");
        }

        var objectStorePeliculas = db.createObjectStore("peliculas", { keyPath: "codigo", autoIncrement: true });
        objectStorePeliculas.transaction.oncomplete = function(evento) {
            console.log("El object store de peliculas se creo con exito");
        }
        objectStorePeliculas.transaction.onerror = function(evento) {
            console.log("Error al crear el object store de peliculas");
        }

    }

})();

function AgregarPelicula() {

    var campos = [
        { campo: 'titulo', valido: false },
        { campo: 'caratula', valido: false },
        { campo: 'resumen', valido: false },
        { campo: 'fecha', valido: false },
        { campo: 'clasificacion', valido: false },
        { campo: 'categoria', valido: false },
    ];

    for (var i = 0; i < campos.length; i++) {
        campos[i].valido = validarCampoVacio(campos[i].campo);
    }

    for (var i = 0; i < campos.length; i++) {
        if (!campos[i].valido)
            return;
    }

    let pelicula = {};
    pelicula.titulo = document.querySelector('#titulo').value;
    pelicula.caratula = document.querySelector('#caratula').value;
    pelicula.resumen = document.querySelector('#resumen').value;
    pelicula.fecha = document.querySelector('#fecha').value;
    pelicula.calificacion = document.querySelector('#clasificacion').value;
    pelicula.categoria = document.querySelector('#categoria').value;
    pelicula.original = document.querySelector('#original').value;
    pelicula.principal = document.querySelector('#principal').value;

    var transaccion = db.transaction(["peliculas"], "readwrite"); //
    var objectStorePeliculas = transaccion.objectStore("peliculas");
    var solicitud = objectStorePeliculas.add(pelicula);
    solicitud.onsuccess = function(evento) {
        console.log("Se agrego la pelicula correctamente");
    };

    solicitud.onerror = function(evento) {
        console.log("Ocurrio un error al guardar");
    };

    console.log(pelicula);
}

function validarCampoVacio(campo) {
    if (document.getElementById(campo).value == '') {
        document.getElementById(campo).classList.add('input-error');
        return false;
    } else {
        document.getElementById(campo).classList.remove('input-error');
        return true;
    }
}

function validarFecha(fecha) {
    var re = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/;
    if (re.test(fecha.value))
        fecha.classList.remove('input-error');
    else
        fecha.classList.add('input-error');
}

function eliminar(key) {
    //Eliminar el elemento del arreglo de JSONs con shift
    var transaccion = db.transaction(["peliculas"], "readwrite");
    var objectStorePeliculas = transaccion.objectStore("peliculas");
    var solicitud = objectStorePeliculas.delete(key);
    solicitud.onsuccess = function() {
            console.log("Se elimino");
        }
        //Actualizar pagina.
}

function LlenarCategorias() {
    const categorias = [{
            nombreCategoria: 'Acción',
            descripcion: 'cuyo argumento implica una interacción moral entre el «bien» y el «mal» llevada a su fin por la violencia o la fuerza física.'
        },
        {
            nombreCategoria: 'Ciencia ficción',
            descripcion: ' se basa en un futuro cercano o muy lejano, donde se logra ver el avance de la tecnología y como ejecuta este en la historia.'
        },
        {
            nombreCategoria: 'Comedia',
            descripcion: 'películas realizadas con la intención de provocar humor, entretenimiento y/o risa en el espectador.'
        },
        {
            nombreCategoria: 'Drama',
            descripcion: 'en el cine, películas que se centran principalmente en el desarrollo de un conflicto entre los protagonistas, o del protagonista con su entorno o consigo mismo.'
        },
        {
            nombreCategoria: 'Anime',
            descripcion: 'Animacion Japonesa.'
        }
    ];

    categorias.forEach(categoria => {
        const transaccion = db.transaction(["categorias"], "readwrite"); ///readwrite: Escritura/lectura, readonly: Solo lectura
        const objectStorePeliculas = transaccion.objectStore("categorias");
        const solicitud = objectStorePeliculas.add(categoria);
        solicitud.onsuccess = function(evento) {
            console.log("Se agrego la categorias correctamente");

        };

        solicitud.onerror = function(evento) {
            console.log("Ocurrio un error al guardar");
        };

        console.log(categoria);
    });
}

function llenarSelectCategorias() {
    const categoria = document.querySelector('#categoria');

    const transaccion = db.transaction(["categorias"], "readonly");
    const objectStoreCategorias = transaccion.objectStore("categorias");
    const cursor = objectStoreCategorias.openCursor();
    cursor.onsuccess = function(evento) {
        if (evento.target.result) {
            console.log(evento.target.result.value);
            const op = document.createElement('option');
            op.text = evento.target.result.value.nombreCategoria;
            op.value = evento.target.result.value.nombreCategoria;
            categoria.add(op);
            evento.target.result.continue();
        }
    };
}

function llenarAgregados() {
    const agregados = document.querySelector('#agregados');
    var transaccion = db.transaction(["peliculas"], "readonly");
    var objectStorePeliculas = transaccion.objectStore("peliculas");
    var cursor = objectStorePeliculas.openCursor();
    cursor.onsuccess = function(evento) {
        if (evento.target.result) {
            console.log(evento.target.result.value);
            const pelicula = evento.target.result.value;
            const div = document.createElement('div');
            const estrella = '<i class="fas fa-star texto-rojo "></i>';
            let estrellas = '';
            for (let i = 0; i < pelicula.calificacion; i++) {
                estrellas += estrella;
            }
            div.innerHTML = `
            <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6">
            <div class="elemento" style="background-image: url(${pelicula.caratula})"><span class="margenes">
                <img src="img/logo-netflix-small.png" alt="Netflix"></span>
            </div>
            <h6 class="texto-blanco">${pelicula.titulo}</h6>
            <p class="texto-blanco">${pelicula.resumen}</p>
            ${estrellas}
            <p class="texto-rojo small"><span>Ver mas</span> I <span>Eliminar</span></p>
            <div>`;
            agregados.appendChild(div);
            evento.target.result.continue();
        }
    };
}






/***************************************************** */
function llenarPeliculas() {
    const agregados = document.querySelector('#agregados');
    const principal = document.querySelector('#Divprincipal');
    var transaccion = db.transaction(["peliculas"], "readonly");
    var objectStorePeliculas = transaccion.objectStore("peliculas");
    var cursor = objectStorePeliculas.openCursor();
    cursor.onsuccess = function(evento) {
        if (evento.target.result) {
            console.log(evento.target.result.value);
            const pelicula = evento.target.result.value;
            if (pelicula.principal === 'on') {
                principal.appendChild(crearPrincipal(pelicula));
            } else {
                agregados.appendChild(crearReciente(pelicula));
            }
            evento.target.result.continue();
        }
    };
}

function crearPrincipal(pelicula) {
    console.log(principal)
    const div = document.createElement('div');
    const estrella = '<i class="fas fa-star texto-rojo "></i>';
    let estrellas = '';
    for (let i = 0; i < pelicula.calificacion; i++) {
        estrellas += estrella;
    }
    div.innerHTML = /* html*/ `<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
    <div style="background-image: url( ${pelicula.caratula}); width: 100%; height: 50vh; background-repeat: no-repeat; background-size: cover;">
        <span class="btn btn-sm btn-danger ">¡NUEVO!</span>
    </div>
    <div>
        <h5 class="texto-blanco ">${pelicula.titulo}</h5>
        <p class="texto-blanco ">
        ${pelicula.resumen}
        </p>
        ${estrellas}
        <p class="texto-rojo "><span>Ver mas</span> I <span>Eliminar</span></p>
    </div>`;
    return div;
}

function crearReciente(pelicula) {
    const div = document.createElement('div');
    const estrella = '<i class="fas fa-star texto-rojo "></i>';
    let estrellas = '';
    for (let i = 0; i < pelicula.calificacion; i++) {
        estrellas += estrella;
    }
    div.innerHTML = /* html*/ `<div class="elemento"><span class="margenes"><img src="img/logo-netflix-small.png" alt="Netflix"></span>
    </div>
    <h6 class="texto-blanco">${pelicula.titulo}</h6>
    <p class="texto-blanco">${pelicula.resumen}</p>
    ${estrellas}
    <p class="texto-rojo small"><span>Ver mas</span> I <span>Eliminar</span></p>`;
    return div;
}