let scanner = '',
bandera_eventos = 0,
html5QrcodeScanner = '';
$(document).ready(function () {
	BuscarEmpleadoLogeado();
	listado_eventos();
    verificar_usuario();
});

moment.lang('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
  }
);
moment.lang("es");

function CerrarSesion(){
	$.ajax({
		type: "POST",
		data: {
			param: 3
		},
		
		url: "../utileria.php", 
		dataType: 'JSON',
		success: function(data) {
			$('.cargando').hide(); // Oculta la imagen de cargando 
			if(data.length){
				window.location='../index.php';
			}
			
		}
	});
	
}

function BuscarEmpleadoLogeado(){
	let fechaActualL = new Date(); //Fecha actual
	let fechaActual2 = moment(fechaActualL).format("YYYY-MM-DD");
	$("#txtFechaPedido").val(fechaActual2);
	let empleado = $("#txtNumEmpleado").val()
	if(empleado.replace(/\s/g,"") != ""){
		$.ajax({
            url: "../utileria.php",
            type: "post",
            data: {"param":2, "empleado": empleado},
             success: function(result) {
				let data = JSON.parse(result);
				if (data.estatus == "success") {
					let datos = data.data;
					for(i = 0; i < datos.length; i++){
						let FechaAr =  "Fecha: "+ fechaActual2,
						nombre = datos[i]['Nombre'];
                        nombre_global = nombre;
						let arreglo_nombre = nombre.split(' ');
						let nombre_apellido = arreglo_nombre.length == 4 ? arreglo_nombre[0]+' '+arreglo_nombre[2] 
						: arreglo_nombre.length == 3 ? arreglo_nombre[0]+' '+arreglo_nombre[1] 
						: arreglo_nombre[0]+' '+arreglo_nombre[1]+' '+arreglo_nombre[2]+' '+arreglo_nombre[3];
						$("#NombreCont").text(nombre_apellido);
						$("#nombre_lado_izquierdo").text(nombre_apellido);
						// $("#NombreCont").text(datos[i]['Nombre']);
						$("#Fecha").text(FechaAr);
						// $("#txtNombreEmpleadoLogeado").val(datos[i]['Nombre']);
					}
				}else{

				}
			}
		});
	
	}else{
		Swal.fire('Favor de Agregar un numero de empleado.', "","info");
		CerrarSesion();
	}
}

function listado_eventos(){
	let eventos = `<ul class="nav nav-treeview">`;
	$.ajax({
        url: "../utileria.php",
        type: "post",
        data: {"param":5},
        success: function(result) {
            let data = JSON.parse(result);
            if (data.estatus == 'success') {
				let datos = data.data;
				for (let i = 0; i < datos.length; i++) {
					eventos += `<li class="nav-item menu-is-opening menu-open">
                            <ul class="nav nav-treeview">
                                <li class="nav-item menu-is-opening menu-open">
                                    <a href="#" class="nav-link">
                                        <i class="nav-icon far fa-solid fa-table-tennis-paddle-ball"></i>
                                        <p>
                                        ${datos[i].Nombre_Evento}
                                        <i class="fas fa-angle-left right iconos_hijos"></i>
                                        </p>
                                    </a>
                                    <ul class="nav nav-treeview">
                                        <li class="nav-item">
                                            <a href="resultados.php?id=${datos[i].id_Evento}&modalidad=1" class="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Singles</p>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="resultados.php?id=${datos[i].id_Evento}&modalidad=2" class="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Doubles</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
						</li>`;
				}
				eventos += `</ul>` ;
				$("#listado_eventos").append(eventos);
				$("#numero_total").text(datos.length);
            }
        }
    });
}

function verificar_usuario(){
    $("#datos_jugador").hide();
    $("#mostrar_qr").show();
    $("#foto_jugador").html("");
    html5QrcodeScanner = new Html5QrcodeScanner(
        "reader", { fps: 10, qrbox: {width: 250, height: 250}, rememberLastUsedCamera: true, });
    html5QrcodeScanner.render(onScanSuccess, onScanError);
}

function onScanSuccess(qrCodeMessage) {
    let datos_jugador = qrCodeMessage.split(",");
    let numero_nl = datos_jugador[0].replace(/[^a-zA-Z0-9 ]/g, '');
    $.ajax({
        url: "../utileria.php",
        type: "post",
        data: {"param":14, "numero_nl":numero_nl},
        success: function(result) {
            let data = JSON.parse(result);
            if (data.estatus == 'success') {
                let datos = data.data;
                if (datos[0].Img != '') {
                    $("#foto_jugador").append(`
                        <img src="${datos[0].Img}" style="width:30%;">
                    `);   
                }else{
                    $("#foto_jugador").append(`
                        <img src="../assets/img/imagen_no_disponible.jpg" style="width:30%;">
                    `);
                }
                $("#nl_jugador").html("#"+datos[0].NoNL);
                $("#numero_fmt").html(datos[0].NoFMT);
                $("#nombre_jugador").html(datos[0].Nombre_Completo);
                $("#categoria").html(datos[0].Nombre_Categoria);
                $("#club").html(datos[0].Club);
                Swal.fire({
                    title: 'Jugador verificado',
                    html:
                        'El Jugador existe.<br/>' +
                        '<strong>la ventana se cerrara</strong> en 2 segundos.' ,
                    timer: 2000,
                    // willClose: () => {
                    //     clearInterval(timer)
                    // }
                });
                html5QrcodeScanner.clear();
                $("#mostrar_qr").hide();
                $("#datos_jugador").show();
            }else{
                Swal.fire({
                    title: 'Jugador no encontrado',
                    html:
                        'El Jugador no se encontro.<br/>' +
                        '<strong>la ventana se cerrara</strong> en 2 segundos.' ,
                    timer: 2000,
                    // willClose: () => {
                    //     clearInterval(timer)
                    // }
                });
            }
        }
    });
}

function onScanError(errorMessage) {
  //handle scan error
}

$("#listado_eventos > a#a_listado_eventos").on("click", function(){
    switch (bandera_eventos) {
        case 0:
            bandera_eventos = 1;
            $('#listado_eventos > ul > li > ul').show();
        break;
        case 1:
            bandera_eventos = 0;
            $('#listado_eventos > ul > li > ul').hide();
        break;
    
        default:
            bandera_eventos = 1;
            $('#listado_eventos > ul > li > ul').show();
        break;
    }
});

$("#verificar_jugador").on("click", function(){
    verificar_usuario();
});

    