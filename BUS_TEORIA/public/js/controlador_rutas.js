
$(document).ready(function(){
    //alert("hola");
    $("#rutas").html("");
    //cargar_rutas();
});


function cargar_rutas() {
    $.ajax({
		url:"/rutas",
		method:"GET",
		dataType:"json",
		success:function(res){
            for (var i = 0; i < res.length; i++) {
                $("#rutas").append(`
                
                <div class="col-lg-6 text-center mb-4 col-lg-4 col-md-4 col-sm-4">
                    <div class="border rounded" style="box-shadow: 2px 2px 5px #999">
                    <div>
                        <br>
                        <img class="img responsive" src="img/fondo2.png"  width="150" height="150">
                        <h3>${res[i].nombre}</h3>
                        <div class="col-lg-12">
                            <button class="btn btn-dark" type="button" onclick="mostrar_descripcion(${res[i].cod_ruta});"">Descripción</button>
                            <br><br>
                            <button class="btn btn-info" type="button" onclick="ver_mapa(${res[i].cod_ruta});">Mapa</button>
                            <button class="btn btn-success" type="button" onclick="reservar(${res[i].cod_ruta});">Reservar</button>
                        </div>
                    </div><br>
                    <div id="${res[i].cod_ruta}" style="display:none" >
                        <p>${res[i].descripcion} <br>
                        hora de salida: ${res[i].hora_salida}
                        
                        </p>
                    </div>
                    </div>
                </div>`
                );
            }
		},
		error:function(error){
			console.error(error);
		}
	});
}
