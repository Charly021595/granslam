let table_tenis
bandera_carusel = 0,
bandera_contador = 1;
const valores = window.location.search;
// moment.locale('es');   
//Creamos la instancia
const urlParams = new URLSearchParams(valores);
$(document).ready(function () {
	// BuscarEmpleadoLogeado();
    // $('#example').DataTable();
    cargargrid_tenis();
    // setInterval(cargargrid_tenis(),2000);
});

setInterval(() => {
    cargargrid_tenis();
}, 50000);

moment.lang('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
  }
);
moment.lang("es");

// function BuscarEmpleadoLogeado(){
// 	let fechaActualL = new Date(); //Fecha actual
// 	let fechaActual2 = moment(fechaActualL).format("YYYY-MM-DD");
// 	$("#txtFechaPedido").val(fechaActual2);
// 	let empleado = $("#txtNumEmpleado").val()
// 	if(empleado.replace(/\s/g,"") != ""){
// 		$.ajax({
//             url: "../utileria.php",
//             type: "post",
//             data: {"param":2, "empleado": empleado},
//              success: function(result) {
// 				let data = JSON.parse(result);
// 				if (data.estatus == "success") {
// 					let datos = data.data;
// 					for(i = 0; i < datos.length; i++){
// 						let FechaAr =  "Fecha: "+ fechaActual2,
// 						nombre = datos[i]['Nombre'];
// 						let arreglo_nombre = nombre.split(' ');
// 						let nombre_apellido = arreglo_nombre.length == 4 ? arreglo_nombre[0]+' '+arreglo_nombre[2] 
// 						: arreglo_nombre.length == 3 ? arreglo_nombre[0]+' '+arreglo_nombre[1] 
// 						: arreglo_nombre[0]+' '+arreglo_nombre[1]+' '+arreglo_nombre[2]+' '+arreglo_nombre[3];
// 						$("#NombreCont").text(nombre_apellido);
// 						$("#nombre_lado_izquierdo").text(nombre_apellido);
// 						// $("#NombreCont").text(datos[i]['Nombre']);
// 						$("#Fecha").text(FechaAr);
// 						// $("#txtNombreEmpleadoLogeado").val(datos[i]['Nombre']);
// 					}
// 				}else{

// 				}
// 			}
// 		});
	
// 	}else{
// 		Swal.fire('Favor de Agregar un numero de empleado.', "","info");
// 		CerrarSesion();
// 	}
// }

function cargargrid_tenis(){
    $('#mostrar_tenis').hide();
    $("#cargando_tabla").show();
    $("#carousel_torneo").html("");
    bandera_carusel = 0;
    //Accedemos a los valores
    let id_evento = urlParams.get('id') != null && urlParams.get('id') != '' ? urlParams.get('id') : 1,
    id_modalidad = urlParams.get('modalidad') != null && urlParams.get('modalidad') != '' ? urlParams.get('modalidad') : 1;
    $.ajax({
        url: "../utileria.php",
        type: "post",
        data: {"param":4, "id_evento":id_evento, "modalidad":id_modalidad},
        success: function(result) {
            let data = JSON.parse(result);
            if (data.estatus == 'success') {
                let datos = data.data;
                id_carrousel_data = 0;
                $("#cargando_tabla").hide();
                $('#mostrar_tenis').show();
                $("#carousel_torneo").append(`
                    <div class="row form-group centrar_texto">
                        <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                            <h1 class="titulo_resultado">Jugadores</h1>
                        </div>
                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                            <h1 class="titulo_resultado">Sets</h1>
                        </div>
                        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                            <h1 class="titulo_resultado">Cancha</h1>
                        </div>
                        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                            <h1 class="titulo_resultado">Hora</h1>
                        </div>
                    </div>
                    <hr class="hr_mio"/>
                `);
                for (let i = 0; i < datos.length; i++) {
                    hora_partida_prueba = datos[i].fecha_hora_partido.split(" ");
                    $("#nombre_rama").html(datos[i].nombre_rama);
                    $("#nombre_modalidad").html(datos[i].nombre_modalidad);
                    $("#nombre_evento").html(datos[i].nombre_evento);
                    let fecha_formateada = moment(datos[i].fecha_hora_partido,"DD/MM/YYYY HH:mm:ss").format('YYYY/MM/DD HH:mm:ss');
                    let fecha_partido = moment(fecha_formateada).format('LL');
                    let hora_partida = hora_partida_prueba[2]+" "+hora_partida_prueba[3];
                    switch (datos[i].id_modalidad) {
                        case 1:
                            if (bandera_carusel == 0 || bandera_contador < 3) {
                                if (bandera_carusel == 0) {
                                    $("#carousel_torneo").append(`
                                        <div id="elementos_carrusel${datos[i].id_juego}" class="carousel-item active centrar_texto" data-interval="3000">
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <h1 class="titulo_resultado" id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
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
                                                    <h1 class="titulo_resultado">${datos[i].cancha}</h1>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    <h1 class="titulo_resultado">${hora_partida}</h1>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <h1 class="titulo_resultado" id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
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
                                                <h1 class="titulo_resultado" id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
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
                                                <h1 class="titulo_resultado">${datos[i].cancha}</h1>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                <h1 class="titulo_resultado">${hora_partida}</h1>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                <h1 class="titulo_resultado" id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
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
                                        <div id="elementos_carrusel${datos[i].id_juego}" class="carousel-item centrar_texto" data-interval="3000">
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <h1 class="titulo_resultado" id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
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
                                                    <h1 class="titulo_resultado">${datos[i].cancha}</h1>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    <h1 class="titulo_resultado">${hora_partida}</h1>
                                                </div>
                                                </div>
                                                <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <h1 class="titulo_resultado" id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
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
                                                <h1 class="titulo_resultado" id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
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
                                                <h1 class="titulo_resultado">${datos[i].cancha}</h1>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                <h1 class="titulo_resultado">${hora_partida}</h1>
                                            </div>
                                            </div>
                                            <div class="row">
                                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                <h1 class="titulo_resultado" id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
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
                                        <div id="elementos_carrusel${datos[i].id_juego}" class="carousel-item active centrar_texto" data-interval="3000">
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 class="titulo_resultado" id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 class="titulo_resultado" id="id_h1_acompanante_uno_${datos[i].id_juego}_${datos[i].no_nl_acompanante_uno}"></h1>
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
                                                    <h1 class="titulo_resultado">${datos[i].cancha}</h1>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    <h1 class="titulo_resultado">${hora_partida}</h1>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 class="titulo_resultado" id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 class="titulo_resultado" id="id_h1_acompanante_dos_${datos[i].id_juego}_${datos[i].no_nl_acompanante_dos}"></h1>
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
                                                        <h1 class="titulo_resultado" id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 class="titulo_resultado" id="id_h1_acompanante_uno_${datos[i].id_juego}_${datos[i].no_nl_acompanante_uno}"></h1>
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
                                                <h1 class="titulo_resultado">${datos[i].cancha}</h1>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                <h1 class="titulo_resultado">${hora_partida}</h1>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 class="titulo_resultado" id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 class="titulo_resultado" id="id_h1_acompanante_dos_${datos[i].id_juego}_${datos[i].no_nl_acompanante_dos}"></h1>
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
                                        <div id="elementos_carrusel${datos[i].id_juego}" class="carousel-item centrar_texto" data-interval="3000">
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 class="titulo_resultado" id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 class="titulo_resultado" id="id_h1_acompanante_uno_${datos[i].id_juego}_${datos[i].no_nl_acompanante_uno}"></h1>
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
                                                    <h1 class="titulo_resultado">${datos[i].cancha}</h1>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                    <h1 class="titulo_resultado">${hora_partida}</h1>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 class="titulo_resultado" id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                            <h1 class="titulo_resultado" id="id_h1_acompanante_dos_${datos[i].id_juego}_${datos[i].no_nl_acompanante_dos}"></h1>
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
                                                        <h1 class="titulo_resultado" id="id_h1_jugador_uno_${datos[i].id_juego}_${datos[i].no_jugador_uno}"></h1>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 class="titulo_resultado" id="id_h1_acompanante_uno_${datos[i].id_juego}_${datos[i].no_nl_acompanante_uno}"></h1>
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
                                                <h1 class="titulo_resultado">${datos[i].cancha}</h1>
                                            </div>
                                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                                <h1 class="titulo_resultado">${hora_partida}</h1>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 class="titulo_resultado" id="id_h1_jugador_dos_${datos[i].id_juego}_${datos[i].no_nl_jugador_dos}"></h1>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <h1 class="titulo_resultado" id="id_h1_acompanante_dos_${datos[i].id_juego}_${datos[i].no_nl_acompanante_dos}"></h1>
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

                    bandera_carusel = bandera_carusel >= 2 ? 1 : bandera_carusel;
                    bandera_contador = bandera_contador > 3 ? 1 : bandera_contador;
                }
                // listar_partidos(data.data);
                // $("#tabla_partidos").show();
                $("#cargando_tabla").hide();
            }else{
                $("#cargando_tabla").hide();
                Swal.fire({
                    icon: 'info',
                    title: data.mensaje+"!",
                    timer: 2000,
                    showConfirmButton: false,
                    imageUrl: '../assets/img/construccion.jpg',
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                });
            }
        }
    });
}

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