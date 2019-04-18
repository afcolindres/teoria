
$(document).ready(function(){
    //alert("hola");
    $("#rutas").html("");
    cargar_rutas();
});


function cargar_rutas() {
    $.ajax({
		url:"/rutas",
		method:"GET",
		dataType:"json",
		success:function(res){
            for (var i = 0; i < res.length; i++) {
                $("#rutasver").append(`
                <h3></h3>
                <div class="col-lg-4 mb-4 col-lg-4 col-md-4 col-sm-4" style="text-align:center">
                    <div class="border rounded" style="box-shadow: 2px 2px 5px #999">
                        <div>
                            <br>
                            <img class="img responsive" src="img/imagen.jpg"  width="150" height="150">
                            <div class="col-lg-12">
                            <br>
                            <button class="btn btn-dark" type="button" onclick="detalles_ruta(${res[i].COD_RUTA});" >Descripción viaje ${res[i].COD_RUTA}</button>
                            <br>
                            </div>
                        </div><br>
                    </div>
                </div>
                   `
                );
            }
		},
		error:function(error){
			console.error(error);
		}
	});
}

$("#btn_calcular").click(function(){

//***************************************************************************** */
////***********************registro de usuarios******************************* */
    var parametros=`cant_viajes=${$("#can_viajes").val()}`;
    $.ajax({
        url: "/registrar_rutas",
        method: "POST",
        data: parametros,
        dataType: "json",
        success: function (res) {
            $("#rutasver").html("");
            cargar_rutas();
            
        },
        error: function (error) {
            console.error(error);
        }
    });
});

function detalles_ruta(codigo_ruta) {
    parametro=`codigo_ruta=${codigo_ruta}`;
    $.ajax({
		url:"/detalle_ruta",
        method:"POST",
        data: parametro,
		dataType:"json",
		success:function(res){
            $("#fila").html("");
            $("#fila").append(`
            <td >${res[0].CANT_P_CLASE}</td>
            <td>${res[0].CANT_P_NORMAL}</td>
            <td>${res[0].CANT_TRA_EDAD_NIÑOS}</td>
            <td>L. ${res[0].UTILIDAD}.00</td>`
            ); 

            x1=(res[0].CANT_P_CLASE*1000)-(2333+(res[0].CANT_P_CLASE*50));
            x2=(res[0].CANT_P_NORMAL*700)-(2333+(res[0].CANT_P_NORMAL*50));
            x3=(res[0].CANT_TRA_EDAD_NIÑOS*500)-(2334+(res[0].CANT_TRA_EDAD_NIÑOS*50));
            $("#chart").html("");
            ver_grafico(x1,x2,x3);
            $('#reserva').modal('show');
		},
		error:function(error){
            
		}
	});
}


function ver_grafico(x1,x2,x3) {
        if (window.bar) {
            window.bar.clear();
            window.bar.destroy();
        }
        
		var datos = {
			labels : ["Primera Clase", "Normal", "Tercera edad y niños"],
			datasets : [{
				label : "Datos",
				backgroundColor : "rgba(220,220,220,0.5)",
				data : [x1, x2, x3]
			}
			]
        };
        
		var canvas = document.getElementById('chart').getContext('2d');
		window.bar = new Chart(canvas, {
			type : "bar",
			data : datos,
			options : {
				elements : {
					rectangle : {
						borderWidth : 1,
						borderColor : "rgb(0,255,0)",
						borderSkipped : 'bottom'
					}
				},
				responsive : true,
				title : {
					display : true,
					text : "Utilidad por categoria"
				}
			}
        });
    
}



function detalles_rutas() {
    $.ajax({
		url:"/detalle_rutas",
        method:"POST",
		dataType:"json",
		success:function(res){
            $("#utilidades").html("");
            v1=0;
            v2=0;
            v3=0;
            i=0;
            for ( i = 0; i< res.length; i++) {
                x1=(res[i].CANT_P_CLASE*1000)-(2333+(res[i].CANT_P_CLASE*50));
                x2=(res[i].CANT_P_NORMAL*700)-(2333+(res[i].CANT_P_NORMAL*50));
                x3=(res[i].CANT_TRA_EDAD_NIÑOS*500)-(2334+(res[i].CANT_TRA_EDAD_NIÑOS*50));
                v1=v1+x1;
                v2=v2+x2;
                v3=v3+x3;
                $("#utilidades").append(`
                <tr>
                    <td >${res[i].COD_RUTA}</th>
                    <td>${x1}.00</td>
                    <td>${x2}.00</td>
                    <td>${x3}.00</td>
                    <td>${res[i].UTILIDAD}.00</td>
                </tr>`
                );   
            }
            
            console.log(v1/i);
            console.log(v2/i);
            console.log(v3/i);
            ver_graficos(v1/i,v2/i,v3/i);
            $('#detalles').modal('show');
		},
		error:function(error){
            
		}
	});
}


function ver_graficos(x1,x2,x3) {
    if (window.bar) {
        window.bar.clear();
        window.bar.destroy();
    }
    
    var datos = {
        labels : ["Primera Clase", "Normal", "Tercera edad y niños"],
        datasets : [{
            label : "Datos",
            backgroundColor : "rgba(220,220,220,0.5)",
            data : [x1, x2, x3]
        }
        ]
    };
    
    var canvas = document.getElementById('chart2').getContext('2d');
    window.bar = new Chart(canvas, {
        type : "bar",
        data : datos,
        options : {
            elements : {
                rectangle : {
                    borderWidth : 1,
                    borderColor : "rgb(0,255,0)",
                    borderSkipped : 'bottom'
                }
            },
            responsive : true,
            title : {
                display : true,
                text : "Utilidad promedio por viaje"
            }
        }
    });

}