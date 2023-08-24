let table_partidos
bandera_scanear = 0,
scanner = '',
nombre_global = '',
bandera_carusel = 0,
bandera_contador = 1,
bandera_eventos = 0,
html5QrcodeScanner = ''; 
$(document).ready(function () {
	BuscarEmpleadoLogeado();
	listado_eventos();
    cargargrid_partidos();
    cargar_canchas();
    cargar_modalidad();
    cargar_rama();
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
    $("#evento").html("");
    $("#add_evento").html("");
	let eventos = `<ul class="nav nav-treeview">`;
    $("#evento").append("<option value=''>Selecciona una Evento</option>");
    $("#add_evento").append("<option value=''>Selecciona una Evento</option>");
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
                        $("#evento").append(`<option value="${datos[i].id_Evento}">${datos[i].Nombre_Evento}</option>`);
                        $("#add_evento").append(`<option value="${datos[i].id_Evento}">${datos[i].Nombre_Evento}</option>`);
				}
				eventos += `</ul>` ;
				$("#listado_eventos").append(eventos);
				$("#numero_total").text(datos.length);
                $("#add_evento").trigger("change").val(datos[0].id_Evento);
            }
        }
    });
}

function cargar_canchas(){
    $.ajax({
        url: "../utileria.php",
        type: "post",
        data: {"param":10},
        success: function(result) {
            let data = JSON.parse(result);
            if (data.estatus == 'success') {
                let datos = data.data;
                for (let i = 0; i < datos.length; i++) {
                    $("#cancha").append(`
                        <option value="${datos[i].id_cancha}">${datos[i].nombre_cancha}</option>
                    `);
                    $("#add_cancha").append(`
                        <option value="${datos[i].id_cancha}">${datos[i].nombre_cancha}</option>
                    `);
                    $("#editar_cancha").append(`
                        <option value="${datos[i].id_cancha}">${datos[i].nombre_cancha}</option>
                    `);
                }
            }
        }
    });
}

function cargar_modalidad(){
    $.ajax({
        url: "../utileria.php",
        type: "post",
        data: {"param":15},
        success: function(result) {
            let data = JSON.parse(result);
            if (data.estatus == 'success') {
                let datos = data.data;
                for (let i = 0; i < datos.length; i++) {
                    $("#modalidad").append(`
                        <option value="${datos[i].id_modalidad}">${datos[i].nombre_modalidad}</option>
                    `);
                }
            }
        }
    });
}

function cargar_rama(){
    $("#rama_crear_partido").append(`
        <option value="">Selecciona una Rama</option>
    `);
    $.ajax({
        url: "../utileria.php",
        type: "post",
        data: {"param":20},
        success: function(result) {
            let data = JSON.parse(result);
            if (data.estatus == 'success') {
                let datos = data.data;
                for (let i = 0; i < datos.length; i++) {
                    $("#rama_crear_partido").append(`
                        <option value="${datos[i].id_rama}">${datos[i].nombre_rama}</option>
                    `);
                }
            }
        }
    });
}

function cargargrid_partidos(){
    $('#mostrar_partidos').hide();
    $("#cargando_tabla").show();
    $("#carousel_torneo").html("");
    $("#carousel_torneo").append(`
        <div class="row form-group centrar_texto">
            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                <h1 class="titulo">Jugadores</h1>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                <h1 class="titulo">Sets</h1>
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                <h1 class="titulo">Cancha</h1>
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                <h1 class="titulo">Hora</h1>
            </div>
        </div>
        <hr class="hr_mio"/>
    `);
    bandera_carusel = 0;
    let id_evento = 0;
    $.ajax({
        url: "../utileria.php",
        type: "post",
        data: {"param":4},
        success: function(result) {
            let data = JSON.parse(result);
            if (data.estatus == 'success') {
                let datos = data.data,
                id_carrousel_data = 0;
                $("#cargando_tabla").hide();
                $('#mostrar_partidos').show();
                $("#cargando_tabla").hide();
                $('#mostrar_partidos').show();
                for (let i = 0; i < datos.length; i++) {
                    hora_partida_prueba = datos[i].fecha_hora_partido.split(" ");
                    let fecha_formateada = moment(datos[i].fecha_hora_partido,"DD/MM/YYYY HH:mm:ss").format('YYYY/MM/DD HH:mm:ss');
                    let fecha_partido = moment(fecha_formateada).format('LL');
                    let hora_partida = hora_partida_prueba[2]+" "+hora_partida_prueba[3];
                    switch (datos[i].id_modalidad) {
                        case 1:
                            if (bandera_carusel == 0 || bandera_contador < 3) {
                                if (bandera_carusel == 0) {
                                    $("#carousel_torneo").append(`
                                        <div id="elementos_carrusel${datos[i].id_juego}" class="carousel-item active centrar_texto" data-interval="100000">
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <h1 class="titulo" id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                    <table id="table_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}" class="table table-bordered table-responsive-xs">
                                                    <tr>
                                                        <td>${datos[i].resultado_set_uno_jugador_uno}</td>
                                                        <td>${datos[i].resultado_set_dos_jugador_uno}</td>
                                                        <td>${datos[i].resultado_set_tres_jugador_uno}</td>
                                                    </tr>
                                                    </table>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    <h1 class="titulo">${datos[i].cancha}</h1>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    <h1 class="titulo">${hora_partida}</h1>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <h1 class="titulo" id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                    <table id="table_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}" class="table table-bordered table-responsive-xs">
                                                    <tr>
                                                        <td>${datos[i].resultado_set_uno_jugador_dos}</td>
                                                        <td>${datos[i].resultado_set_dos_jugador_dos}</td>
                                                        <td>${datos[i].resultado_set_tres_jugador_dos}</td>
                                                    </tr>
                                                    </table>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    
                                                </div>
                                            </div>
                                            
                                            <div class="row">
                                                <div id="boton_editar_${datos[i].id_juego}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                    <hr/>
                                                </div>
                                            </div>
                                        </div>
                                    `);
                                    id_carrousel_data = "#elementos_carrusel"+datos[i].id_juego;
                                    bandera_carusel++;
                                    bandera_contador = 1;
                                }else if(bandera_contador < 3){
                                    $(id_carrousel_data).append(`
                                        <div class="row">
                                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                <h1 class="titulo" id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                <table id="table_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}" class="table table-bordered table-responsive-xs">
                                                <tr>
                                                    <td>${datos[i].resultado_set_uno_jugador_uno}</td>
                                                    <td>${datos[i].resultado_set_dos_jugador_uno}</td>
                                                    <td>${datos[i].resultado_set_tres_jugador_uno}</td>
                                                </tr>
                                                </table>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                <h1 class="titulo">${datos[i].cancha}</h1>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                <h1 class="titulo">${hora_partida}</h1>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                <h1 class="titulo" id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                <table id="table_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}" class="table table-bordered table-responsive-xs">
                                                <tr>
                                                    <td>${datos[i].resultado_set_uno_jugador_dos}</td>
                                                    <td>${datos[i].resultado_set_dos_jugador_dos}</td>
                                                    <td>${datos[i].resultado_set_tres_jugador_dos}</td>
                                                </tr>
                                                </table>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                
                                            </div>
                                        </div>
                                        
                                        <div class="row">
                                            <div id="boton_editar_${datos[i].id_juego}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <hr/>
                                            </div>
                                        </div>
                                    `); 
                                    bandera_carusel++;
                                    bandera_contador++; 
                                } 
                            }else{
                                if (bandera_carusel == 1) {
                                    $("#carousel_torneo").append(`
                                        <div id="elementos_carrusel${datos[i].id_juego}" class="carousel-item centrar_texto" data-interval="100000">
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <h1 class="titulo" id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                    <table id="table_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}" class="table table-bordered table-responsive-xs">
                                                    <tr>
                                                        <td>${datos[i].resultado_set_uno_jugador_uno}</td>
                                                        <td>${datos[i].resultado_set_dos_jugador_uno}</td>
                                                        <td>${datos[i].resultado_set_tres_jugador_uno}</td>
                                                    </tr>
                                                    </table>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    <h1 class="titulo">${datos[i].cancha}</h1>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    <h1 class="titulo">${hora_partida}</h1>
                                                </div>
                                                </div>
                                                <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <h1 class="titulo" id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                    <table id="table_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}" class="table table-bordered table-responsive-xs">
                                                    <tr>
                                                        <td>${datos[i].resultado_set_uno_jugador_dos}</td>
                                                        <td>${datos[i].resultado_set_dos_jugador_dos}</td>
                                                        <td>${datos[i].resultado_set_tres_jugador_dos}</td>
                                                    </tr>
                                                    </table>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                   
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                            
                                                </div>
                                            </div>
                                            
                                            
                                            <div class="row">
                                                <div id="boton_editar_${datos[i].id_juego}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                    <hr/>
                                                </div>
                                            </div>
                                        </div>
                                    `);
                                    id_carrousel_data = "#elementos_carrusel"+datos[i].id_juego;
                                    bandera_contador = 1;
                                    bandera_carusel++;
                                }else if(bandera_contador < 3){
                                    $(id_carrousel_data).append(`
                                        <div class="row">
                                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                <h1 class="titulo" id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                <table id="table_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}" class="table table-bordered table-responsive-xs">
                                                <tr>
                                                    <td>${datos[i].resultado_set_uno_jugador_uno}</td>
                                                    <td>${datos[i].resultado_set_dos_jugador_uno}</td>
                                                    <td>${datos[i].resultado_set_tres_jugador_uno}</td>
                                                </tr>
                                                </table>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                <h1 class="titulo">${datos[i].cancha}</h1>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                <h1 class="titulo">${hora_partida}</h1>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                <h1 id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                <table id="table_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}" class="table table-bordered table-responsive-xs">
                                                <tr>
                                                    <td>${datos[i].resultado_set_uno_jugador_dos}</td>
                                                    <td>${datos[i].resultado_set_dos_jugador_dos}</td>
                                                    <td>${datos[i].resultado_set_tres_jugador_dos}</td>
                                                </tr>
                                                </table>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                            
                                            </div>
                                        </div>
                                        
                            
                                        
                                        <div class="row">
                                            <div id="boton_editar_${datos[i].id_juego}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <hr/>
                                            </div>
                                        </div>
                                    `);  
                                    bandera_carusel++;
                                    bandera_contador++;
                                } 
                            }

                            
                            if ((datos[i].resultado_set_uno_jugador_uno == 99 && 
                                datos[i].resultado_set_dos_jugador_uno == 99 &&
                                datos[i].resultado_set_tres_jugador_uno == 99)) {
                                $("#table_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).html(`
                                    <tr>
                                        <td>DF</td>
                                    </tr>
                                `);
                                $("#table_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).html(`
                                    <tr>
                                        <td>Ganador</td>
                                    </tr>
                                `);
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).html("");
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).html(""); 

                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).append(`
                                    ${datos[i].nombre_jugador_uno}
                                `);
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_jugador_dos}
                                `); 
                            }else if ((datos[i].resultado_set_uno_jugador_dos == 99 && 
                                datos[i].resultado_set_dos_jugador_dos == 99 &&
                                datos[i].resultado_set_tres_jugador_dos == 99)) {
                                $("#table_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).html(`
                                <tr>
                                    <td>Ganador</td>
                                </tr>
                                `);
                                $("#table_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).html(`
                                    <tr>
                                        <td>DF</td>
                                    </tr>
                                `);

                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).html("");
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).html(""); 
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_jugador_uno}
                                `);
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).append(`
                                    ${datos[i].nombre_jugador_dos}
                                `);   
                            }else if ((datos[i].resultado_set_uno_jugador_uno > datos[i].resultado_set_uno_jugador_dos) &&
                            (datos[i].resultado_set_dos_jugador_uno > datos[i].resultado_set_dos_jugador_dos) ||
                            (datos[i].resultado_set_tres_jugador_uno > datos[i].resultado_set_tres_jugador_dos)) {
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_jugador_uno}
                                `);
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).append(`
                                    ${datos[i].nombre_jugador_dos}
                                `);   
                            }else if((datos[i].resultado_set_uno_jugador_uno < datos[i].resultado_set_uno_jugador_dos) &&
                            (datos[i].resultado_set_dos_jugador_uno < datos[i].resultado_set_dos_jugador_dos) ||
                            (datos[i].resultado_set_tres_jugador_uno < datos[i].resultado_set_tres_jugador_dos)){
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).append(`
                                    ${datos[i].nombre_jugador_uno}
                                `);
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_jugador_dos}
                                `); 
                            }else{
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).append(`
                                    ${datos[i].nombre_jugador_uno}
                                `);
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).append(`
                                    ${datos[i].nombre_jugador_dos}
                                `);   
                            }
                        break;

                        case 2:
                            if (bandera_carusel == 0 || bandera_contador < 3) {
                                if (bandera_carusel == 0) {
                                    $("#carousel_torneo").append(`
                                        <div id="elementos_carrusel${datos[i].id_juego}" class="carousel-item active centrar_texto" data-interval="100000">
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 id="id_h1_acompanante_uno_${datos[i].id_juego}_${datos[i].no_nl_acompanante_uno}"></h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <table id="table_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}" class="table table-bordered table-responsive-xs">
                                                                <tr>
                                                                    <td>${datos[i].resultado_set_uno_jugador_uno}</td>
                                                                    <td>${datos[i].resultado_set_dos_jugador_uno}</td>
                                                                    <td>${datos[i].resultado_set_tres_jugador_uno}</td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    <h1>${datos[i].cancha}</h1>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    <h1>${hora_partida}</h1>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 id="id_h1_acompanante_dos_${datos[i].id_juego}_${datos[i].no_nl_acompanante_dos}"></h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <table id="table_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}" class="table table-bordered table-responsive-xs">
                                                                <tr>
                                                                    <td>${datos[i].resultado_set_uno_jugador_dos}</td>
                                                                    <td>${datos[i].resultado_set_dos_jugador_dos}</td>
                                                                    <td>${datos[i].resultado_set_tres_jugador_dos}</td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div id="boton_editar_${datos[i].id_juego}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                    <hr/>
                                                </div>
                                            </div>
                                        </div>
                                    `);
                                    id_carrousel_data = "#elementos_carrusel"+datos[i].id_juego;
                                    bandera_contador = 1;
                                    bandera_carusel++;
                                }else if(bandera_contador < 3){
                                    $(id_carrousel_data).append(`
                                        <div class="row">
                                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 id="id_h1_acompanante_uno_${datos[i].id_juego}_${datos[i].no_nl_acompanante_uno}"></h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <table id="table_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}" class="table table-bordered table-responsive-xs">
                                                            <tr>
                                                                <td>${datos[i].resultado_set_uno_jugador_uno}</td>
                                                                <td>${datos[i].resultado_set_dos_jugador_uno}</td>
                                                                <td>${datos[i].resultado_set_tres_jugador_uno}</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                <h1>${datos[i].cancha}</h1>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                <h1>${hora_partida}</h1>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 id="id_h1_acompanante_dos_${datos[i].id_juego}_${datos[i].no_nl_acompanante_dos}"></h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <table id="table_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}" class="table table-bordered table-responsive-xs">
                                                            <tr>
                                                                <td>${datos[i].resultado_set_uno_jugador_dos}</td>
                                                                <td>${datos[i].resultado_set_dos_jugador_dos}</td>
                                                                <td>${datos[i].resultado_set_tres_jugador_dos}</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div id="boton_editar_${datos[i].id_juego}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <hr/>
                                            </div>
                                        </div>
                                    `); 
                                    bandera_carusel++;
                                    bandera_contador++; 
                                } 
                            }else{
                                if (bandera_carusel == 1) {
                                    $("#carousel_torneo").append(`
                                        <div id="elementos_carrusel${datos[i].id_juego}" class="carousel-item centrar_texto" data-interval="100000">
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 id="id_h1_acompanante_uno_${datos[i].id_juego}_${datos[i].no_nl_acompanante_uno}"></h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                    <table id="table_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}" class="table table-bordered table-responsive-xs">
                                                    <tr>
                                                        <td>${datos[i].resultado_set_uno_jugador_uno}</td>
                                                        <td>${datos[i].resultado_set_dos_jugador_uno}</td>
                                                        <td>${datos[i].resultado_set_tres_jugador_uno}</td>
                                                    </tr>
                                                    </table>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    <h1>${datos[i].cancha}</h1>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    <h1>${hora_partida}</h1>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 id="id_h1_acompanante_dos_${datos[i].id_juego}_${datos[i].no_nl_acompanante_dos}"></h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                    <table id="table_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}" class="table table-bordered table-responsive-xs">
                                                    <tr>
                                                        <td>${datos[i].resultado_set_uno_jugador_dos}</td>
                                                        <td>${datos[i].resultado_set_dos_jugador_dos}</td>
                                                        <td>${datos[i].resultado_set_tres_jugador_dos}</td>
                                                    </tr>
                                                    </table>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                            
                                                </div>
                                            </div>
                                            
                                            <div class="row">
                                                <div id="boton_editar_${datos[i].id_juego}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                    <hr/>
                                                </div>
                                            </div>
                                        </div>
                                    `);
                                    id_carrousel_data = "#elementos_carrusel"+datos[i].id_juego;
                                    bandera_carusel++;
                                    bandera_contador = 1;
                                }else if(bandera_contador < 3){
                                    $(id_carrousel_data).append(`
                                        <div class="row">
                                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 id="id_h1_acompanante_uno_${datos[i].id_juego}_${datos[i].no_nl_acompanante_uno}"></h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                <table id="table_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}" class="table table-bordered table-responsive-xs">
                                                <tr>
                                                    <td>${datos[i].resultado_set_uno_jugador_uno}</td>
                                                    <td>${datos[i].resultado_set_dos_jugador_uno}</td>
                                                    <td>${datos[i].resultado_set_tres_jugador_uno}</td>
                                                </tr>
                                                </table>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                <h1>${datos[i].cancha}</h1>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                <h1>${hora_partida}</h1>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 id="id_h1_acompanante_dos_${datos[i].id_juego}_${datos[i].no_nl_acompanante_dos}"></h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                <table id="table_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}" class="table table-bordered table-responsive-xs">
                                                <tr>
                                                    <td>${datos[i].resultado_set_uno_jugador_dos}</td>
                                                    <td>${datos[i].resultado_set_dos_jugador_dos}</td>
                                                    <td>${datos[i].resultado_set_tres_jugador_dos}</td>
                                                </tr>
                                                </table>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                            
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                        
                                            </div>
                                        </div>
                                        
                                        
                                        <div class="row">
                                            <div id="boton_editar_${datos[i].id_juego}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <hr/>
                                            </div>
                                        </div>
                                    `);  
                                    bandera_carusel++;
                                    bandera_contador++;
                                } 
                            }

                            if ((datos[i].resultado_set_uno_jugador_uno == 99 && 
                                datos[i].resultado_set_dos_jugador_uno == 99 &&
                                datos[i].resultado_set_tres_jugador_uno == 99)) {
                                $("#table_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).html(`
                                    <tr>
                                        <td>DF</td>
                                    </tr>
                                `);
                                $("#table_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).html(`
                                    <tr>
                                        <td>Ganador</td>
                                    </tr>
                                `);

                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).html("");
                                $("#id_h1_acompanante_uno_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_uno).html("");
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).html(""); 
                                $("#id_h1_acompanante_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_dos).html("");

                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).append(`
                                    ${datos[i].nombre_jugador_uno}
                                `);
                                $("#id_h1_acompanante_uno_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_uno).append(`
                                    ${datos[i].nombre_acompanante_uno}
                                `);
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_jugador_dos}
                                `); 
                                $("#id_h1_acompanante_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_dos).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_acompanante_dos}
                                `);
                            }else if ((datos[i].resultado_set_uno_jugador_dos == 99 && 
                                datos[i].resultado_set_dos_jugador_dos == 99 &&
                                datos[i].resultado_set_tres_jugador_dos == 99)) {
                                $("#table_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).html(`
                                    <tr>
                                        <td>Ganador</td>
                                    </tr>
                                `);
                                $("#table_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).html(`
                                    <tr>
                                        <td>DF</td>
                                    </tr>
                                `);
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).html("");
                                $("#id_h1_acompanante_uno_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_uno).html("");
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).html(""); 
                                $("#id_h1_acompanante_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_dos).html("");
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_jugador_uno}
                                `);
                                $("#id_h1_acompanante_uno_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_uno).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_acompanante_uno}
                                `);
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).append(`
                                    ${datos[i].nombre_jugador_dos}
                                `);  
                                $("#id_h1_acompanante_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_dos).append(`
                                    ${datos[i].nombre_acompanante_dos}
                                `); 
                            }else if ((datos[i].resultado_set_uno_jugador_uno > datos[i].resultado_set_uno_jugador_dos) &&
                            (datos[i].resultado_set_dos_jugador_uno > datos[i].resultado_set_dos_jugador_dos) ||
                            (datos[i].resultado_set_tres_jugador_uno > datos[i].resultado_set_tres_jugador_dos)) {
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_jugador_uno}
                                `);
                                $("#id_h1_acompanante_uno_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_uno).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_acompanante_uno}
                                `);
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).append(`
                                    ${datos[i].nombre_jugador_dos}
                                `);  
                                $("#id_h1_acompanante_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_dos).append(`
                                    ${datos[i].nombre_acompanante_dos}
                                `);   
                            }else if((datos[i].resultado_set_uno_jugador_uno < datos[i].resultado_set_uno_jugador_dos) &&
                            (datos[i].resultado_set_dos_jugador_uno < datos[i].resultado_set_dos_jugador_dos) ||
                            (datos[i].resultado_set_tres_jugador_uno < datos[i].resultado_set_tres_jugador_dos)){
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).append(`
                                    ${datos[i].nombre_jugador_uno}
                                `);
                                $("#id_h1_acompanante_uno_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_uno).append(`
                                    ${datos[i].nombre_acompanante_uno}
                                `);
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_jugador_dos}
                                `); 
                                $("#id_h1_acompanante_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_dos).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_acompanante_dos}
                                `);
                            }else{
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).append(`
                                    ${datos[i].nombre_jugador_uno}
                                `);
                                $("#id_h1_acompanante_uno_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_uno).append(`
                                    ${datos[i].nombre_acompanante_uno}
                                `);
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).append(`
                                    ${datos[i].nombre_jugador_dos}
                                `); 
                                $("#id_h1_acompanante_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_dos).append(`
                                    ${datos[i].nombre_acompanante_dos}
                                `);  
                            }
                        break;
                    }

                    $("#fecha_partidos").html(fecha_partido);

                    $("#boton_editar_"+datos[i].id_juego).html(`
                        <button id="editar_juegos_modal" onclick="editar_partidos_modal(${(datos[i].id_cancha)}, 
                        ${(datos[i].no_jugador_uno)}, '${datos[i].no_fmt_jugador_uno}', 
                        '${datos[i].nombre_jugador_uno}', ${datos[i].no_nl_jugador_dos}, 
                        '${datos[i].no_fmt_jugador_dos}','${datos[i].nombre_jugador_dos}', 
                        ${datos[i].id_modalidad}, '${datos[i].fecha_hora_partido}', 
                        ${datos[i].resultado_set_uno_jugador_uno}, ${datos[i].resultado_set_dos_jugador_uno},
                        ${datos[i].resultado_set_tres_jugador_uno}, ${datos[i].resultado_set_uno_jugador_dos}, 
                        ${datos[i].resultado_set_dos_jugador_dos}, ${datos[i].resultado_set_tres_jugador_dos},
                        ${datos[i].no_nl_acompanante_uno}, '${datos[i].no_fmt_acompanante_uno}', 
                        '${datos[i].nombre_acompanante_uno}', ${datos[i].no_nl_acompanante_dos}, 
                        '${datos[i].no_fmt_acompanante_dos}', '${datos[i].nombre_acompanante_dos}', 
                        ${datos[i].id_juego}, ${datos[i].id_evento})" 
                        class="btn btn-success float-right" data-toggle="modal" data-target="#editar_juegos">
                            Editar <i class='fa fa-edit'></i>
                        </button>
                    `);

                    bandera_carusel = bandera_carusel >= 2 ? 1 : bandera_carusel;
                    bandera_contador = bandera_contador > 3 ? 1 : bandera_contador;
                }
                $("#cargando_tabla").hide();
            }else{
                $("#cargando_tabla").hide();
                Swal.fire( 
					data.mensaje,
					'',
					'info'
				);
            }
        }
    });
}

function editar_partidos_modal(id_cancha, nl_jugador_uno, no_fmt_jugador_uno, 
    nombre_jugador_uno, nl_jugador_dos, no_fmt_jugador_dos, nombre_jugador_dos, 
    id_modalidad, fecha_partido, resultado_set_uno_jugador_uno, 
    resultado_set_dos_jugador_uno, resultado_set_tres_jugador_uno, 
    resultado_set_uno_jugador_dos, resultado_set_dos_jugador_dos, 
    resultado_set_tres_jugador_dos, no_nl_acompanante_uno, 
    no_fmt_acompanante_uno, nombre_acompanante_uno, 
    no_nl_acompanante_dos, no_fmt_acompanante_dos, 
    nombre_acompanante_dos, id_juego, id_evento){
        if (fecha_partido != "") {
            fecha_partido_hora = fecha_partido.split(" ");
            let fecha = fecha_partido_hora[0].replace("/", "-")
            hora_partido = fecha_partido_hora[2];
            fecha = fecha.replace("/", "-");
            fecha = fecha.split("-").reverse().join("-");
            fecha_partido = fecha+"T"+hora_partido;
        }
        $("#id_evento_editar").val(id_evento);
        $("#id_juego_editar").val(id_juego);
        $("#editar_cancha").val(id_cancha);
        $("#id_jugador_uno_editar").val(nl_jugador_uno);
        $("#id_fmt_jugador_uno_editar").val(no_fmt_jugador_uno);
        $("#nombre_jugador_uno_editar").val(nombre_jugador_uno);
        $("#numero_jugador_dos_editar").val(nl_jugador_dos);
        $("#id_fmt_jugador_dos_editar").val(no_fmt_jugador_dos);
        $("#nombre_jugador_dos_editar").val(nombre_jugador_dos);
        $("#modalidad_crear_partido_editar").val(id_modalidad).trigger("change");
        $("#fecha_crear_partido_editar").val(fecha_partido);
        $("#resultado_uno_jugador_uno").val(resultado_set_uno_jugador_uno);
        $("#resultado_dos_jugador_uno").val(resultado_set_dos_jugador_uno);
        $("#resultado_tres_jugador_uno").val(resultado_set_tres_jugador_uno);
        $("#resultado_uno_jugador_dos").val(resultado_set_uno_jugador_dos);
        $("#resultado_dos_jugador_dos").val(resultado_set_dos_jugador_dos);
        $("#resultado_tres_jugador_dos").val(resultado_set_tres_jugador_dos);
        switch (id_modalidad) {
            case 1:
                $("#id_acompanante_uno_editar").val("");
                $("#id_fmt_acompanante_uno_editar").val("");
                $("#nombre_acompanante_uno_editar").val("");
                $("#id_acompanante_dos_editar").val("");
                $("#id_fmt_acompanante_dos_editar").val("");
                $("#nombre_acompanante_dos_editar").val("");
            break;

            case 2:
                $("#id_acompanante_uno_editar").val(no_nl_acompanante_uno);
                $("#id_fmt_acompanante_uno_editar").val(no_fmt_acompanante_uno);
                $("#nombre_acompanante_uno_editar").val(nombre_acompanante_uno);
                $("#id_acompanante_dos_editar").val(no_nl_acompanante_dos);
                $("#id_fmt_acompanante_dos_editar").val(no_fmt_acompanante_dos);
                $("#nombre_acompanante_dos_editar").val(nombre_acompanante_dos);
            break;
        }
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

$("#btn_guardar_partido").on("click", function(e){
    bandera_scanear = 0;
    e.preventDefault();
    $("#btn_guardar_partido").addClass("deshabilitar");
  	$('#btn_guardar_partido').attr("disabled", true);
    let id_evento = $("#add_evento").val(),
    cancha = $("#add_cancha").val(),
    numero_nl_jugador_uno = $("#id_jugador_uno").val(),
    numero_fmt_jugador_uno = $("#id_fmt_jugador_uno").val(),
    nombre_jugador_uno = $("#nombre_jugador_uno").val(),
    numero_nl_jugador_dos = $("#numero_jugador_dos").val(),
    numero_fmt_jugador_dos = $("#numero_fmt_jugador_dos").val(),
    nombre_jugador_dos = $("#nombre_jugador_dos").val(),
    numero_nl_acompanante_uno = $("#id_acompanante_uno").val(),
    numero_fmt_acompanante_uno = $("#numero_fmt_acompanante_uno").val(),
    nombre_acompanante_uno = $("#nombre_acompanante_uno").val(),
    numero_nl_acompanante_dos = $("#id_acompanante_dos").val(),
    numero_fmt_acompanante_dos = $("#numero_fmt_acompanante_dos").val(),
    nombre_acompanante_dos = $("#nombre_acompanante_dos").val(),
    rama = $("#rama_crear_partido").val(),
    modalidad = $("#modalidad_crear_partido").val(),
    fecha_hora = $("#fecha_crear_partido").val(),
    usuario = nombre_global;
    if (cancha == '') {
        Swal.fire('La Cancha esta vacía', '', 'info');
        $("#btn_guardar_partido").removeAttr("disabled, disabled");
        $("#btn_guardar_partido").removeClass("deshabilitar");
        $('#btn_guardar_partido').attr("disabled", false);
        return false;
    }
    if (numero_nl_jugador_uno == '') {
        Swal.fire('El Número NL del jugador uno esta vacío', '', 'info');
        $("#btn_guardar_partido").removeAttr("disabled, disabled");
        $("#btn_guardar_partido").removeClass("deshabilitar");
        $('#btn_guardar_partido').attr("disabled", false);
        return false;
    }
    if (numero_fmt_jugador_uno == '') {
        Swal.fire('El Número FMT del jugador uno esta vacío', '', 'info');
        $("#btn_guardar_partido").removeAttr("disabled, disabled");
        $("#btn_guardar_partido").removeClass("deshabilitar");
        $('#btn_guardar_partido').attr("disabled", false);
        return false;
    }
    if (nombre_jugador_uno == '') {
        Swal.fire('El Nombre del jugador uno esta vacío', '', 'info');
        $("#btn_guardar_partido").removeAttr("disabled, disabled");
        $("#btn_guardar_partido").removeClass("deshabilitar");
        $('#btn_guardar_partido').attr("disabled", false);
        return false;
    }
    if (numero_nl_jugador_dos == '') {
        Swal.fire('El Número NL del jugador dos esta vacío', '', 'info');
        $("#btn_guardar_partido").removeAttr("disabled, disabled");
        $("#btn_guardar_partido").removeClass("deshabilitar");
        $('#btn_guardar_partido').attr("disabled", false);
        return false;
    }
    if (numero_fmt_jugador_dos == '') {
        Swal.fire('El Número FMT del jugador dos esta vacío', '', 'info');
        $("#btn_guardar_partido").removeAttr("disabled, disabled");
        $("#btn_guardar_partido").removeClass("deshabilitar");
        $('#btn_guardar_partido').attr("disabled", false);
        return false;
    }
    if (nombre_jugador_dos == '') {
        Swal.fire('El Nombre del jugador dos esta vacío', '', 'info');
        $("#btn_guardar_partido").removeAttr("disabled, disabled");
        $("#btn_guardar_partido").removeClass("deshabilitar");
        $('#btn_guardar_partido').attr("disabled", false);
        return false;
    }
    if (rama == '') {
        Swal.fire('La rama esta vacía', '', 'info');
        $("#btn_guardar_partido").removeAttr("disabled, disabled");
        $("#btn_guardar_partido").removeClass("deshabilitar");
        $('#btn_guardar_partido').attr("disabled", false);
        return false;
    }
    if (modalidad == '') {
        Swal.fire('La modalidad esta vacía', '', 'info');
        $("#btn_guardar_partido").removeAttr("disabled, disabled");
        $("#btn_guardar_partido").removeClass("deshabilitar");
        $('#btn_guardar_partido').attr("disabled", false);
        return false;
    }
    if (modalidad == 2) {
        if (numero_nl_acompanante_uno == '') {
            Swal.fire('El Número NL del acompañante uno esta vacío', '', 'info');
            $("#btn_guardar_partido").removeAttr("disabled, disabled");
            $("#btn_guardar_partido").removeClass("deshabilitar");
            $('#btn_guardar_partido').attr("disabled", false);
            return false;
        }
        if (numero_fmt_acompanante_uno == '') {
            Swal.fire('El Número FMT del acompañante uno esta vacío', '', 'info');
            $("#btn_guardar_partido").removeAttr("disabled, disabled");
            $("#btn_guardar_partido").removeClass("deshabilitar");
            $('#btn_guardar_partido').attr("disabled", false);
            return false;
        }
        if (nombre_acompanante_uno == '') {
            Swal.fire('El Nombre del acompañante uno esta vacío', '', 'info');
            $("#btn_guardar_partido").removeAttr("disabled, disabled");
            $("#btn_guardar_partido").removeClass("deshabilitar");
            $('#btn_guardar_partido').attr("disabled", false);
            return false;
        }
        if (numero_nl_acompanante_dos == '') {
            Swal.fire('El Número NL del acompañante dos esta vacío', '', 'info');
            $("#btn_guardar_partido").removeAttr("disabled, disabled");
            $("#btn_guardar_partido").removeClass("deshabilitar");
            $('#btn_guardar_partido').attr("disabled", false);
            return false;
        }
        if (numero_fmt_acompanante_dos == '') {
            Swal.fire('El Número FMT del acompañante dos esta vacío', '', 'info');
            $("#btn_guardar_partido").removeAttr("disabled, disabled");
            $("#btn_guardar_partido").removeClass("deshabilitar");
            $('#btn_guardar_partido').attr("disabled", false);
            return false;
        }
        if (nombre_acompanante_dos == '') {
            Swal.fire('El Nombre del acompañante dos esta vacío', '', 'info');
            $("#btn_guardar_partido").removeAttr("disabled, disabled");
            $("#btn_guardar_partido").removeClass("deshabilitar");
            $('#btn_guardar_partido').attr("disabled", false);
            return false;
        }
    }
    if (fecha_hora == '') {
        Swal.fire('La fecha esta vacía', '', 'info');
        $("#btn_guardar_partido").removeAttr("disabled, disabled");
        $("#btn_guardar_partido").removeClass("deshabilitar");
        $('#btn_guardar_partido').attr("disabled", false);
        return false;
    }
    $.ajax({
        url: "../utileria.php",
        type: "post",
        data: {"param":13, "id_evento":id_evento, "cancha":cancha, 
        "numero_nl_jugador_uno":numero_nl_jugador_uno, 
        "numero_fmt_jugador_uno":numero_fmt_jugador_uno, 
        "nombre_jugador_uno":nombre_jugador_uno, 
        "numero_nl_jugador_dos":numero_nl_jugador_dos,
        "numero_fmt_jugador_dos":numero_fmt_jugador_dos,
        "nombre_jugador_dos":nombre_jugador_dos,
        "numero_nl_acompanante_uno":numero_nl_acompanante_uno,
        "numero_fmt_acompanante_uno":numero_fmt_acompanante_uno,
        "nombre_acompanante_uno":nombre_acompanante_uno,
        "numero_nl_acompanante_dos":numero_nl_acompanante_dos,
        "numero_fmt_acompanante_dos":numero_fmt_acompanante_dos,
        "nombre_acompanante_dos":nombre_acompanante_dos,
        "rama":rama, "modalidad":modalidad,
        "fecha_hora":fecha_hora, "usuario":usuario},
        success: function(result) {
            let data = JSON.parse(result);
            if (data.estatus == 'success') {
                Swal.fire( 
                    data.mensaje,
                    '',
                    'success'
                );
                $("#add_cancha").val("");
                $("#id_jugador_uno").val("");
                $("#id_fmt_jugador_uno").val("");
                $("#nombre_jugador_uno").val("");
                $("#numero_jugador_dos").val("");
                $("#numero_fmt_jugador_dos").val("");
                $("#nombre_jugador_dos").val("");
                $("#id_acompanante_uno").val("");
                $("#numero_fmt_acompanante_uno").val("");
                $("#nombre_acompanante_uno").val("");
                $("#id_acompanante_dos").val("");
                $("#numero_fmt_acompanante_dos").val("");
                $("#nombre_acompanante_dos").val("");
                $("#rama_crear_partido").val("");
                $("#modalidad_crear_partido").val("");
                $("#fecha_crear_partido").val("");
                cargargrid_partidos();
                $("#btn_guardar_partido").removeAttr("disabled, disabled");
                $("#btn_guardar_partido").removeClass("deshabilitar");
                $('#btn_guardar_partido').attr("disabled", false);
                html5QrcodeScanner = new Html5QrcodeScanner(
                    "reader", { fps: 10, qrbox: {width: 250, height: 250}, rememberLastUsedCamera: true, });
                html5QrcodeScanner.render(onScanSuccess, onScanError);
            }else{
                Swal.fire( 
                    data.mensaje,
                    '',
                    'info'
                );
                $("#btn_guardar_partido").removeAttr("disabled, disabled");
                $("#btn_guardar_partido").removeClass("deshabilitar");
                $('#btn_guardar_partido').attr("disabled", false);
            }
        }
    });
});

$("#btn_editar_partido").on("click", function(e){
    e.preventDefault();
    $("#btn_editar_partido").addClass("deshabilitar");
  	$('#btn_editar_partido').attr("disabled", true);
    let update_cancha = $("#editar_cancha").val(),
    update_juego = $("#id_juego_editar").val(),
    update_evento = $("#id_evento_editar").val(), 
    // update_numero_nl_jugador_uno = $("#id_jugador_uno_editar").val(),
    // update_numero_fmt_jugador_uno = $("#id_fmt_jugador_uno_editar").val(),
    // update_nombre_jugador_uno = $("#nombre_jugador_uno_editar").val(),
    update_jugador_uno_set_uno = $("#resultado_uno_jugador_uno").val(),
    update_jugador_uno_set_dos = $("#resultado_dos_jugador_uno").val(),
    update_jugador_uno_set_tres = $("#resultado_tres_jugador_uno").val(),
    // update_numero_nl_jugador_dos = $("#numero_jugador_dos_editar").val(),
    // update_numero_fmt_jugador_dos = $("#id_fmt_jugador_dos_editar").val(),
    // update_nombre_jugador_dos = $("#nombre_jugador_dos_editar").val(),
    update_jugador_dos_set_uno = $("#resultado_uno_jugador_dos").val(),
    update_jugador_dos_set_dos = $("#resultado_dos_jugador_dos").val(),
    update_jugador_dos_set_tres = $("#resultado_tres_jugador_dos").val(),
    // update_numero_nl_acompanante_uno = $("#id_jugador_uno_editar").val(),
    // update_numero_fmt_acompanante_uno = $("#id_fmt_jugador_uno_editar").val(),
    // update_nombre_acompanante_uno = $("#nombre_jugador_uno_editar").val(),
    // update_numero_nl_acompanante_dos = $("#id_jugador_uno_editar").val(),
    // update_numero_fmt_acompanante_dos = $("#id_fmt_jugador_uno_editar").val(),
    // update_nombre_acompanante_dos = $("#nombre_jugador_uno_editar").val(),
    update_modalidad = $("#modalidad_crear_partido_editar").val(),
    update_fecha_hora = $("#fecha_crear_partido_editar").val(),
    usuario = nombre_global;
    alert(update_fecha_hora);
    $.ajax({
        url: "../utileria.php",
        type: "post",
        data: {"param":11, "update_cancha":update_cancha, "update_juego":update_juego, 
        "update_evento":update_evento, 
        // "update_numero_nl_jugador_uno":update_numero_nl_jugador_uno, 
        // "update_numero_fmt_jugador_uno":update_numero_fmt_jugador_uno, 
        // "update_nombre_jugador_uno":update_nombre_jugador_uno, 
        "update_jugador_uno_set_uno":update_jugador_uno_set_uno,
        "update_jugador_uno_set_dos":update_jugador_uno_set_dos, 
        "update_jugador_uno_set_tres":update_jugador_uno_set_tres, 
        // "update_numero_nl_jugador_dos":update_numero_nl_jugador_dos,
        // "update_numero_fmt_jugador_dos":update_numero_fmt_jugador_dos,
        // "update_nombre_jugador_dos":update_nombre_jugador_dos,
        "update_jugador_dos_set_uno":update_jugador_dos_set_uno,
        "update_jugador_dos_set_dos":update_jugador_dos_set_dos,
        "update_jugador_dos_set_tres":update_jugador_dos_set_tres,
        // "update_numero_nl_acompanante_uno":update_numero_nl_acompanante_uno,
        // "update_numero_fmt_acompanante_uno":update_numero_fmt_acompanante_uno,
        // "update_nombre_acompanante_uno":update_nombre_acompanante_uno,
        // "update_numero_nl_acompanante_dos":update_numero_nl_acompanante_dos,
        // "update_numero_fmt_acompanante_dos":update_numero_fmt_acompanante_dos,
        // "update_nombre_acompanante_dos":update_nombre_acompanante_dos,
        "update_modalidad":update_modalidad,
        "update_fecha_hora":update_fecha_hora, "usuario":usuario},
        success: function(result) {
            let data = JSON.parse(result);
            if (data.estatus == 'success') {
                Swal.fire( 
                    data.mensaje,
                    '',
                    'success'
                );
                cargargrid_partidos();
                window.location.reload();
            }else{
                Swal.fire( 
                    data.mensaje,
                    '',
                    'info'
                );
                $("#btn_editar_partido").removeAttr("disabled, disabled");
                $("#btn_editar_partido").removeClass("deshabilitar");
                $('#btn_editar_partido').attr("disabled", false);
            }
        }
    });
});

function modalidad_crear_partido() {
    let modalidad = $("#modalidad_crear_partido").val();
    if(modalidad == 2) {
        $('#acompanantes').show();
    }else{
        $('#acompanantes').hide();
    }
}

function editar_modalidad(){
    let modalidad = $("#modalidad_crear_partido_editar").val();
    if(modalidad == 2) {
        $('#acompanantes_editar').show();
    }else{
        $('#acompanantes_editar').hide();
    }
}

$("#crear_partido").on("click", function(){
    $("#id_jugador_uno").val("");
    $("#id_fmt_jugador_uno").val("");
    $("#nombre_jugador_uno").val("");
    $("#numero_jugador_dos").val("");
    $("#numero_fmt_jugador_dos").val("");
    $("#nombre_jugador_dos").val("");
    $("#id_acompanante_uno").val("");
    $("#numero_fmt_acompanante_uno").val("");
    $("#nombre_acompanante_uno").val("");
    $("#id_acompanante_dos").val("");
    $("#numero_fmt_acompanante_dos").val("");
    $("#nombre_acompanante_dos").val("");
    $("#add_cancha").val("");
    $("#modalidad_crear_partido").val("").trigger("change");
    $("#fecha_crear_partido").val("");

    html5QrcodeScanner = new Html5QrcodeScanner(
        "reader", { fps: 10, qrbox: {width: 250, height: 250}, rememberLastUsedCamera: true, });
    html5QrcodeScanner.render(onScanSuccess, onScanError);

    $("#reader__dashboard_section_csr > div > button").addClass("btn btn-info");
    $("#reader__dashboard_section_csr > div > button").text("Permisos Camara");
    $("#reader__dashboard_section_swaplink").text("Subir foto");
});

function onScanSuccess(qrCodeMessage) {
    bandera_scanear = bandera_scanear > 3 ? 0 : bandera_scanear;
    let datos_jugador = qrCodeMessage.split(",");
    let numero_jugador_nl = datos_jugador[0],
    nombre_jugador = datos_jugador[1],
    numero_jugador_fmt = datos_jugador[2],
    anterior_numero_jugador_nl = '',
    anterior_nombre_jugador = '',
    anterior_numero_jugador_fmt = '',
    anterior_numero_jugador_nl_dos = '',
    anterior_nombre_jugador_dos = '',
    anterior_numero_jugador_fmt_dos = '';
    anterior_numero_jugador_nl_acom_uno = '',
    anterior_nombre_jugador_acom_uno = '',
    anterior_numero_jugador_fmt_acom_uno = '';

    switch (bandera_scanear) {
        case 0:
            $("#id_jugador_uno").val(numero_jugador_nl);
            $("#nombre_jugador_uno").val(nombre_jugador);
            $("#id_fmt_jugador_uno").val(numero_jugador_fmt);
            Swal.fire({
                title: 'Se agrego el jugador 1',
                html:
                    'Se tomaron los datos del jugador 1 correctamente.<br/><br/>' +
                    '<strong>la ventana se cerrara</strong> en 3 segundos.' ,
                timer: 2000,
                // willClose: () => {
                //     clearInterval(timer)
                // }
            });
            bandera_scanear++;
        break;

        case 1:
            anterior_numero_jugador_nl = $("#id_jugador_uno").val();
            anterior_nombre_jugador = $("#nombre_jugador_uno").val();
            anterior_numero_jugador_fmt = $("#id_fmt_jugador_uno").val();
            
            if ((anterior_numero_jugador_nl != numero_jugador_nl) && (anterior_nombre_jugador != nombre_jugador) && (anterior_numero_jugador_fmt != numero_jugador_fmt)) {
                $("#numero_jugador_dos").val(numero_jugador_nl);
                $("#nombre_jugador_dos").val(nombre_jugador);
                $("#numero_fmt_jugador_dos").val(numero_jugador_fmt);
                Swal.fire({
                    title: 'Se agrego el jugador 2',
                    html:
                        'Se tomaron los datos del jugador 2 correctamente.<br/><br/>' +
                        '<strong>la ventana se cerrara</strong> en 3 segundos.' ,
                    timer: 2000,
                    // willClose: () => {
                    //     clearInterval(timer)
                    // }
                });
                bandera_scanear++;   
            }else{
                Swal.fire({
                    title: 'Jugador duplicado',
                    html:
                        'El jugador ya fue insertado',
                    timer: 2000,
                });   
            }
        break;

        case 2:
            anterior_numero_jugador_nl = $("#id_jugador_uno").val();
            anterior_nombre_jugador = $("#nombre_jugador_uno").val();
            anterior_numero_jugador_fmt = $("#id_fmt_jugador_uno").val();
            anterior_numero_jugador_nl_dos = $("#numero_jugador_dos").val();
            anterior_nombre_jugador_dos = $("#nombre_jugador_dos").val();
            anterior_numero_jugador_fmt_dos = $("#numero_fmt_jugador_dos").val();

            if ((anterior_numero_jugador_nl != numero_jugador_nl) && (anterior_nombre_jugador != nombre_jugador) && (anterior_numero_jugador_fmt != numero_jugador_fmt) &&
            (anterior_numero_jugador_nl_dos != numero_jugador_nl) && (anterior_nombre_jugador_dos != nombre_jugador) && (anterior_numero_jugador_fmt_dos != numero_jugador_fmt)) {
                $("#id_acompanante_uno").val(numero_jugador_nl);
                $("#nombre_acompanante_uno").val(nombre_jugador);
                $("#numero_fmt_acompanante_uno").val(numero_jugador_fmt);
                Swal.fire({
                    title: 'Se agrego el acompañane 1',
                    html:
                        'Se tomaron los datos del acompañante 1 correctamente.<br/><br/>' +
                        '<strong>la ventana se cerrara</strong> en 3 segundos.' ,
                    timer: 2000,
                    // willClose: () => {
                    //     clearInterval(timer)
                    // }
                });
                bandera_scanear++;
            }else{
                Swal.fire({
                    title: 'Jugador duplicado',
                    html:
                        'El jugador ya fue insertado',
                    timer: 2000,
                });   
            }
        break;

        case 3:
            anterior_numero_jugador_nl = $("#id_jugador_uno").val();
            anterior_nombre_jugador = $("#nombre_jugador_uno").val();
            anterior_numero_jugador_fmt = $("#id_fmt_jugador_uno").val();
            anterior_numero_jugador_nl_dos = $("#numero_jugador_dos").val();
            anterior_nombre_jugador_dos = $("#nombre_jugador_dos").val();
            anterior_numero_jugador_fmt_dos = $("#numero_fmt_jugador_dos").val();
            anterior_numero_jugador_nl_acom_uno = $("#id_acompanante_uno").val();
            anterior_nombre_jugador_acom_uno = $("#nombre_acompanante_uno").val();
            anterior_numero_jugador_fmt_acom_uno = $("#numero_fmt_acompanante_uno").val();

            if ((anterior_numero_jugador_nl != numero_jugador_nl) && (anterior_nombre_jugador != nombre_jugador) && (anterior_numero_jugador_fmt != numero_jugador_fmt) &&
            (anterior_numero_jugador_nl_dos != numero_jugador_nl) && (anterior_nombre_jugador_dos != nombre_jugador) && (anterior_numero_jugador_fmt_dos != numero_jugador_fmt) &&
            (anterior_numero_jugador_nl_acom_uno != numero_jugador_nl) && (anterior_nombre_jugador_acom_uno != nombre_jugador) && (anterior_numero_jugador_fmt_acom_uno != numero_jugador_fmt)) {
                $("#id_acompanante_dos").val(numero_jugador_nl);
                $("#nombre_acompanante_dos").val(nombre_jugador);
                $("#numero_fmt_acompanante_dos").val(numero_jugador_fmt);
                Swal.fire({
                    title: 'Se agrego el acompañante 2',
                    html:
                        'Se tomaron los datos del acompañante 2 correctamente.<br/><br/>' +
                        '<strong>la ventana se cerrara</strong> en 3 segundos.' ,
                    timer: 2000,
                    // willClose: () => {
                    //     clearInterval(timer)
                    // }
                });
                bandera_scanear++;
                html5QrcodeScanner.clear();
            }else{
                Swal.fire({
                    title: 'Jugador duplicado',
                    html:
                        'El jugador ya fue insertado',
                    timer: 2000,
                });   
            }
        break;
    
        default:
            $("#id_jugador_uno").val(numero_jugador_nl);
            $("#nombre_jugador_uno").val(nombre_jugador);
            $("#id_fmt_jugador_uno").val(numero_jugador_fmt);
            Swal.fire({
                title: 'Se agrego el jugador 1',
                html:
                    'Se tomaron los datos del jugador 1 correctamente.<br/><br/>' +
                    '<strong>la ventana se cerrara</strong> en 3 segundos.' ,
                timer: 2000,
                // willClose: () => {
                //     clearInterval(timer)
                // }
            });
            bandera_scanear++;
        break;
    }
}

function onScanError(errorMessage) {
  //handle scan error
}

$("#btn_cerrar").on("click", function(){
    html5QrcodeScanner.clear();
});

$("#cruz_cerrar_modal").on("click", function(){
    html5QrcodeScanner.clear();
});

$("#buscar_partidos").on("click", function(){
    $('#mostrar_partidos').hide();
    $("#cargando_tabla").show();
    let evento = $("#evento").val() != "" ? $("#evento").val() : null,
    cancha = $("#cancha").val() != "" ? $("#cancha").val() : null,
    modalidad = $("#modalidad").val() != "" ? $("#modalidad").val() : null,
    jugador = $("#jugador").val() != "" ? $("#jugador").val() : null;
    $("#carousel_torneo").html("");
    $("#carousel_torneo").append(`
        <div class="row form-group centrar_texto">
            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                <h1 class="titulo">Jugadores</h1>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                <h1 class="titulo">Sets</h1>
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                <h1 class="titulo">Cancha</h1>
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                <h1 class="titulo">Hora</h1>
            </div>
        </div>
        <hr class="hr_mio"/>
    `);
    bandera_carusel = 0;
    $.ajax({
        url: "../utileria.php",
        type: "post",
        data: {"param":16, "evento":evento, "cancha":cancha, "modalidad":modalidad, 
        "jugador":jugador},
        success: function(result) {
            let data = JSON.parse(result);
            if (data.estatus == 'success') {
                let datos = data.data,
                id_carrousel_data = 0;
                $("#cargando_tabla").hide();
                $('#mostrar_partidos').show();
                for (let i = 0; i < datos.length; i++) {
                    let fecha_formateada = moment(datos[i].fecha_hora_partido,"DD/MM/YYYY HH:mm:ss").format('YYYY/MM/DD HH:mm:ss');
                    let fecha_partido = moment(fecha_formateada).format('LL');
                    let hora_partida = moment(fecha_formateada).format('LT');
                    switch (datos[i].id_modalidad) {
                        case 1:
                            if (bandera_carusel == 0 || bandera_contador < 3) {
                                if (bandera_carusel == 0) {
                                    $("#carousel_torneo").append(`
                                        <div id="elementos_carrusel${datos[i].id_juego}" class="carousel-item active centrar_texto" data-interval="100000">
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <h1 id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                    <table id="table_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}" class="table table-bordered table-responsive-xs">
                                                    <tr>
                                                        <td>${datos[i].resultado_set_uno_jugador_uno}</td>
                                                        <td>${datos[i].resultado_set_dos_jugador_uno}</td>
                                                        <td>${datos[i].resultado_set_tres_jugador_uno}</td>
                                                    </tr>
                                                    </table>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    <h1>${datos[i].cancha}</h1>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    <h1>${hora_partida}</h1>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <h1 id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                    <table id="table_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}" class="table table-bordered table-responsive-xs">
                                                    <tr>
                                                        <td>${datos[i].resultado_set_uno_jugador_dos}</td>
                                                        <td>${datos[i].resultado_set_dos_jugador_dos}</td>
                                                        <td>${datos[i].resultado_set_tres_jugador_dos}</td>
                                                    </tr>
                                                    </table>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    
                                                </div>
                                            </div>
                                            
                                            <div class="row">
                                                <div id="boton_editar_${datos[i].id_juego}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                    <hr/>
                                                </div>
                                            </div>
                                        </div>
                                    `);
                                    id_carrousel_data = "#elementos_carrusel"+datos[i].id_juego;
                                    bandera_carusel++;
                                    bandera_contador = 1;
                                }else if(bandera_contador < 3){
                                    $(id_carrousel_data).append(`
                                        <div class="row">
                                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                <h1 id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                <table id="table_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}" class="table table-bordered table-responsive-xs">
                                                <tr>
                                                    <td>${datos[i].resultado_set_uno_jugador_uno}</td>
                                                    <td>${datos[i].resultado_set_dos_jugador_uno}</td>
                                                    <td>${datos[i].resultado_set_tres_jugador_uno}</td>
                                                </tr>
                                                </table>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                <h1>${datos[i].cancha}</h1>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                <h1>${hora_partida}</h1>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                <h1 id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                <table id="table_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}" class="table table-bordered table-responsive-xs">
                                                <tr>
                                                    <td>${datos[i].resultado_set_uno_jugador_dos}</td>
                                                    <td>${datos[i].resultado_set_dos_jugador_dos}</td>
                                                    <td>${datos[i].resultado_set_tres_jugador_dos}</td>
                                                </tr>
                                                </table>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                
                                            </div>
                                        </div>
                                        
                                        <div class="row">
                                            <div id="boton_editar_${datos[i].id_juego}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            </div>   
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <hr/>
                                            </div>
                                        </div>
                                    `); 
                                    bandera_carusel++;
                                    bandera_contador++; 
                                } 
                            }else{
                                if (bandera_carusel == 1) {
                                    $("#carousel_torneo").append(`
                                        <div id="elementos_carrusel${datos[i].id_juego}" class="carousel-item centrar_texto" data-interval="100000">
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <h1 id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                    <table id="table_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}" class="table table-bordered table-responsive-xs">
                                                    <tr>
                                                        <td>${datos[i].resultado_set_uno_jugador_uno}</td>
                                                        <td>${datos[i].resultado_set_dos_jugador_uno}</td>
                                                        <td>${datos[i].resultado_set_tres_jugador_uno}</td>
                                                    </tr>
                                                    </table>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    <h1>${datos[i].cancha}</h1>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    <h1>${hora_partida}</h1>
                                                </div>
                                                </div>
                                                <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <h1 id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                    <table id="table_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}" class="table table-bordered table-responsive-xs">
                                                    <tr>
                                                        <td>${datos[i].resultado_set_uno_jugador_dos}</td>
                                                        <td>${datos[i].resultado_set_dos_jugador_dos}</td>
                                                        <td>${datos[i].resultado_set_tres_jugador_dos}</td>
                                                    </tr>
                                                    </table>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                   
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                            
                                                </div>
                                            </div>
                                            
                                            
                                            <div class="row">
                                                <div id="boton_editar_${datos[i].id_juego}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                    <hr/>
                                                </div>
                                            </div>
                                        </div>
                                    `);
                                    id_carrousel_data = "#elementos_carrusel"+datos[i].id_juego;
                                    bandera_contador = 1;
                                    bandera_carusel++;
                                }else if(bandera_contador < 3){
                                    $(id_carrousel_data).append(`
                                        <div class="row">
                                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                <h1 id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                <table id="table_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}" class="table table-bordered table-responsive-xs">
                                                <tr>
                                                    <td>${datos[i].resultado_set_uno_jugador_uno}</td>
                                                    <td>${datos[i].resultado_set_dos_jugador_uno}</td>
                                                    <td>${datos[i].resultado_set_tres_jugador_uno}</td>
                                                </tr>
                                                </table>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                <h1>${datos[i].cancha}</h1>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                <h1>${hora_partida}</h1>
                                            </div>
                                            </div>
                                            <div class="row">
                                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                <h1 id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                <table id="table_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}" class="table table-bordered table-responsive-xs">
                                                <tr>
                                                    <td>${datos[i].resultado_set_uno_jugador_dos}</td>
                                                    <td>${datos[i].resultado_set_dos_jugador_dos}</td>
                                                    <td>${datos[i].resultado_set_tres_jugador_dos}</td>
                                                </tr>
                                                </table>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                               
                                            </div>
                                        </div>
                                        
                            
                                        
                                        <div class="row">
                                            <div id="boton_editar_${datos[i].id_juego}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <hr/>
                                            </div>
                                        </div>
                                    `);  
                                    bandera_carusel++;
                                    bandera_contador++;
                                } 
                            }

                            
                            if ((datos[i].resultado_set_uno_jugador_uno == 99 && 
                                datos[i].resultado_set_dos_jugador_uno == 99 &&
                                datos[i].resultado_set_tres_jugador_uno == 99)) {
                                $("#table_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).html(`
                                    <tr>
                                        <td>DF</td>
                                    </tr>
                                `);
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).html("");
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).html(""); 

                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).append(`
                                    ${datos[i].nombre_jugador_uno}
                                `);
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_jugador_dos}
                                `); 
                            }else if ((datos[i].resultado_set_uno_jugador_dos == 99 && 
                                datos[i].resultado_set_dos_jugador_dos == 99 &&
                                datos[i].resultado_set_tres_jugador_dos == 99)) {
                                $("#table_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).html(`
                                    <tr>
                                        <td>DF</td>
                                    </tr>
                                `);
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).html("");
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).html(""); 
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_jugador_uno}
                                `);
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).append(`
                                    ${datos[i].nombre_jugador_dos}
                                `);   
                            }
        
                            if ((datos[i].resultado_set_uno_jugador_uno > datos[i].resultado_set_uno_jugador_dos) &&
                            (datos[i].resultado_set_dos_jugador_uno > datos[i].resultado_set_dos_jugador_dos) ||
                            (datos[i].resultado_set_tres_jugador_uno > datos[i].resultado_set_tres_jugador_dos)) {
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_jugador_uno}
                                `);
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).append(`
                                    ${datos[i].nombre_jugador_dos}
                                `);   
                            }else if((datos[i].resultado_set_uno_jugador_uno < datos[i].resultado_set_uno_jugador_dos) &&
                            (datos[i].resultado_set_dos_jugador_uno < datos[i].resultado_set_dos_jugador_dos) ||
                            (datos[i].resultado_set_tres_jugador_uno < datos[i].resultado_set_tres_jugador_dos)){
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).append(`
                                    ${datos[i].nombre_jugador_dos}
                                `);
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_jugador_uno}
                                `); 
                            }else{
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).append(`
                                    ${datos[i].nombre_jugador_uno}
                                `);
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).append(`
                                    ${datos[i].nombre_jugador_dos}
                                `);   
                            }
                        break;

                        case 2:
                            if (bandera_carusel == 0 || bandera_contador < 3) {
                                if (bandera_carusel == 0) {
                                    $("#carousel_torneo").append(`
                                        <div id="elementos_carrusel${datos[i].id_juego}" class="carousel-item active centrar_texto" data-interval="100000">
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 id="id_h1_acompanante_uno_${datos[i].id_juego}_${datos[i].no_nl_acompanante_uno}"></h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <table id="table_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}" class="table table-bordered table-responsive-xs">
                                                                <tr>
                                                                    <td>${datos[i].resultado_set_uno_jugador_uno}</td>
                                                                    <td>${datos[i].resultado_set_dos_jugador_uno}</td>
                                                                    <td>${datos[i].resultado_set_tres_jugador_uno}</td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    <h1>${datos[i].cancha}</h1>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    <h1>${hora_partida}</h1>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 id="id_h1_acompanante_dos_${datos[i].id_juego}_${datos[i].no_nl_acompanante_dos}"></h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <table id="table_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}" class="table table-bordered table-responsive-xs">
                                                                <tr>
                                                                    <td>${datos[i].resultado_set_uno_jugador_dos}</td>
                                                                    <td>${datos[i].resultado_set_dos_jugador_dos}</td>
                                                                    <td>${datos[i].resultado_set_tres_jugador_dos}</td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div id="boton_editar_${datos[i].id_juego}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                    <hr/>
                                                </div>
                                            </div>
                                        </div>
                                    `);
                                    id_carrousel_data = "#elementos_carrusel"+datos[i].id_juego;
                                    bandera_contador = 1;
                                    bandera_carusel++;
                                }else if(bandera_contador < 3){
                                    $(id_carrousel_data).append(`
                                        <div class="row">
                                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 id="id_h1_acompanante_uno_${datos[i].id_juego}_${datos[i].no_nl_acompanante_uno}"></h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <table id="table_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}" class="table table-bordered table-responsive-xs">
                                                            <tr>
                                                                <td>${datos[i].resultado_set_uno_jugador_uno}</td>
                                                                <td>${datos[i].resultado_set_dos_jugador_uno}</td>
                                                                <td>${datos[i].resultado_set_tres_jugador_uno}</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                <h1>${datos[i].cancha}</h1>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                <h1>${hora_partida}</h1>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 id="id_h1_acompanante_dos_${datos[i].id_juego}_${datos[i].no_nl_acompanante_dos}"></h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <table id="table_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}" class="table table-bordered table-responsive-xs">
                                                            <tr>
                                                                <td>${datos[i].resultado_set_uno_jugador_dos}</td>
                                                                <td>${datos[i].resultado_set_dos_jugador_dos}</td>
                                                                <td>${datos[i].resultado_set_tres_jugador_dos}</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div id="boton_editar_${datos[i].id_juego}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <hr/>
                                            </div>
                                        </div>
                                    `); 
                                    bandera_carusel++;
                                    bandera_contador++; 
                                } 
                            }else{
                                if (bandera_carusel == 1) {
                                    $("#carousel_torneo").append(`
                                        <div id="elementos_carrusel${datos[i].id_juego}" class="carousel-item centrar_texto" data-interval="100000">
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 id="id_h1_acompanante_uno_${datos[i].id_juego}_${datos[i].no_nl_acompanante_uno}"></h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                    <table id="table_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}" class="table table-bordered table-responsive-xs">
                                                    <tr>
                                                        <td>${datos[i].resultado_set_uno_jugador_uno}</td>
                                                        <td>${datos[i].resultado_set_dos_jugador_uno}</td>
                                                        <td>${datos[i].resultado_set_tres_jugador_uno}</td>
                                                    </tr>
                                                    </table>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    <h1>${datos[i].cancha}</h1>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    <h1>${hora_partida}</h1>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 id="id_h1_acompanante_dos_${datos[i].id_juego}_${datos[i].no_nl_acompanante_dos}"></h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                    <table id="table_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}" class="table table-bordered table-responsive-xs">
                                                    <tr>
                                                        <td>${datos[i].resultado_set_uno_jugador_dos}</td>
                                                        <td>${datos[i].resultado_set_dos_jugador_dos}</td>
                                                        <td>${datos[i].resultado_set_tres_jugador_dos}</td>
                                                    </tr>
                                                    </table>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                            
                                                </div>
                                            </div>
                                            
                                            <div class="row">
                                                <div id="boton_editar_${datos[i].id_juego}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                    <hr/>
                                                </div>
                                            </div>
                                        </div>
                                    `);
                                    id_carrousel_data = "#elementos_carrusel"+datos[i].id_juego;
                                    bandera_carusel++;
                                    bandera_contador = 1;
                                }else if(bandera_contador < 3){
                                    $(id_carrousel_data).append(`
                                        <div class="row">
                                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 id="id_h1_acompanante_uno_${datos[i].id_juego}_${datos[i].no_nl_acompanante_uno}"></h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                <table id="table_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}" class="table table-bordered table-responsive-xs">
                                                <tr>
                                                    <td>${datos[i].resultado_set_uno_jugador_uno}</td>
                                                    <td>${datos[i].resultado_set_dos_jugador_uno}</td>
                                                    <td>${datos[i].resultado_set_tres_jugador_uno}</td>
                                                </tr>
                                                </table>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                <h1>${datos[i].cancha}</h1>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                <h1>${hora_partida}</h1>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 id="id_h1_acompanante_dos_${datos[i].id_juego}_${datos[i].no_nl_acompanante_dos}"></h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                <table id="table_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}" class="table table-bordered table-responsive-xs">
                                                <tr>
                                                    <td>${datos[i].resultado_set_uno_jugador_dos}</td>
                                                    <td>${datos[i].resultado_set_dos_jugador_dos}</td>
                                                    <td>${datos[i].resultado_set_tres_jugador_dos}</td>
                                                </tr>
                                                </table>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                            
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                        
                                            </div>
                                        </div>
                                        
                                        
                                        <div class="row">
                                            <div id="boton_editar_${datos[i].id_juego}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <hr/>
                                            </div>
                                        </div>
                                    `);  
                                    bandera_carusel++;
                                    bandera_contador++;
                                } 
                            }

                            if ((datos[i].resultado_set_uno_jugador_uno == 99 && 
                                datos[i].resultado_set_dos_jugador_uno == 99 &&
                                datos[i].resultado_set_tres_jugador_uno == 99)) {
                                $("#table_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).html(`
                                    <tr>
                                        <td>DF</td>
                                    </tr>
                                `);
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).html("");
                                $("#id_h1_acompanante_uno_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_uno).html("");
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).html(""); 
                                $("#id_h1_acompanante_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_dos).html("");

                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).append(`
                                    ${datos[i].nombre_jugador_uno}
                                `);
                                $("#id_h1_acompanante_uno_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_uno).append(`
                                    ${datos[i].nombre_acompanante_uno}
                                `);
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_jugador_dos}
                                `); 
                                $("#id_h1_acompanante_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_dos).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_acompanante_dos}
                                `);
                            }else if ((datos[i].resultado_set_uno_jugador_dos == 99 && 
                                datos[i].resultado_set_dos_jugador_dos == 99 &&
                                datos[i].resultado_set_tres_jugador_dos == 99)) {
                                $("#table_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).html(`
                                    <tr>
                                        <td>DF</td>
                                    </tr>
                                `);
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).html("");
                                $("#id_h1_acompanante_uno_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_uno).html("");
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).html(""); 
                                $("#id_h1_acompanante_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_dos).html("");
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_jugador_uno}
                                `);
                                $("#id_h1_acompanante_uno_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_uno).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_acompanante_uno}
                                `);
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).append(`
                                    ${datos[i].nombre_jugador_dos}
                                `);  
                                $("#id_h1_acompanante_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_dos).append(`
                                    ${datos[i].nombre_acompanante_dos}
                                `); 
                            }else if ((datos[i].resultado_set_uno_jugador_uno > datos[i].resultado_set_uno_jugador_dos) &&
                            (datos[i].resultado_set_dos_jugador_uno > datos[i].resultado_set_dos_jugador_dos) ||
                            (datos[i].resultado_set_tres_jugador_uno > datos[i].resultado_set_tres_jugador_dos)) {
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_jugador_uno}
                                `);
                                $("#id_h1_acompanante_uno_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_uno).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_acompanante_uno}
                                `);
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).append(`
                                    ${datos[i].nombre_jugador_dos}
                                `);  
                                $("#id_h1_acompanante_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_dos).append(`
                                    ${datos[i].nombre_acompanante_dos}
                                `);   
                            }else if((datos[i].resultado_set_uno_jugador_uno < datos[i].resultado_set_uno_jugador_dos) &&
                            (datos[i].resultado_set_dos_jugador_uno < datos[i].resultado_set_dos_jugador_dos) ||
                            (datos[i].resultado_set_tres_jugador_uno < datos[i].resultado_set_tres_jugador_dos)){
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).append(`
                                    ${datos[i].nombre_jugador_dos}
                                `);
                                $("#id_h1_acompanante_uno_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_uno).append(`
                                    ${datos[i].nombre_acompanante_uno}
                                `);
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_jugador_ds}
                                `); 
                                $("#id_h1_acompanante_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_dos).append(`
                                    <i class="fa-solid fa-crown dorado"></i> ${datos[i].nombre_acompanante_dos}
                                `);
                            }else{
                                $("#id_h1_jugador_uno_"+datos[i].id_juego+"_"+datos[i].no_jugador_uno).append(`
                                    ${datos[i].nombre_jugador_uno}
                                `);
                                $("#id_h1_acompanante_uno_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_uno).append(`
                                    ${datos[i].nombre_acompanante_uno}
                                `);
                                $("#id_h1_jugador_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_jugador_dos).append(`
                                    ${datos[i].nombre_jugador_dos}
                                `); 
                                $("#id_h1_acompanante_dos_"+datos[i].id_juego+"_"+datos[i].no_nl_acompanante_dos).append(`
                                    ${datos[i].nombre_acompanante_dos}
                                `);  
                            }
                        break;
                    }

                    $("#fecha_partidos").html(fecha_partido);

                    $("#boton_editar_"+datos[i].id_juego).html(`
                        <button id="editar_juegos_modal" onclick="editar_partidos_modal(${(datos[i].id_cancha)}, 
                        ${(datos[i].no_jugador_uno)}, '${datos[i].no_fmt_jugador_uno}', 
                        '${datos[i].nombre_jugador_uno}', ${datos[i].no_nl_jugador_dos}, 
                        '${datos[i].no_fmt_jugador_dos}','${datos[i].nombre_jugador_dos}', 
                        ${datos[i].id_modalidad}, '${datos[i].fecha_hora_partido}', 
                        ${datos[i].resultado_set_uno_jugador_uno}, ${datos[i].resultado_set_dos_jugador_uno},
                        ${datos[i].resultado_set_tres_jugador_uno}, ${datos[i].resultado_set_uno_jugador_dos}, 
                        ${datos[i].resultado_set_dos_jugador_dos}, ${datos[i].resultado_set_tres_jugador_dos},
                        ${datos[i].no_nl_acompanante_uno}, '${datos[i].no_fmt_acompanante_uno}', 
                        '${datos[i].nombre_acompanante_uno}', ${datos[i].no_nl_acompanante_dos}, 
                        '${datos[i].no_fmt_acompanante_dos}', '${datos[i].nombre_acompanante_dos}', 
                        ${datos[i].id_juego}, ${datos[i].id_evento})" 
                        class="btn btn-success float-right" data-toggle="modal" data-target="#editar_juegos">
                            Editar <i class='fa fa-edit'></i>
                        </button>
                    `);

                    bandera_carusel = bandera_carusel >= 2 ? 1 : bandera_carusel;
                    bandera_contador = bandera_contador > 3 ? 1 : bandera_contador;
                }
                // listar_partidos(data.data);
                // $("#tabla_partidos").show();
                $("#cargando_tabla").hide();
            }else{
                $("#cargando_tabla").hide();
                Swal.fire( 
					data.mensaje,
					'',
					'info'
				);
            }
        }
    });
}); 

let idioma_espanol = {
    "sProcessing":     "Procesando...",
    "sLengthMenu":     "Mostrar _MENU_ registros",
    "sZeroRecords":    "No se encontraron resultados",
    "sEmptyTable":     "Ningún dato disponible en esta tabla",
    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix":    "",
    "sSearch":         "Buscar:",
    "sUrl":            "",
    "sInfoThousands":  ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
}