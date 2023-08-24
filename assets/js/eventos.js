let nombre_global = '',
bandera_eventos = 0;
let table_eventos;

$(document).ready(function () {
	BuscarEmpleadoLogeado();
	listado_eventos();
});

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
                $("#cargando_tabla").hide();
                $('#mostrar_eventos').show();
				listar_eventos(datos);
            }else{
                $("#cargando_tabla").hide();
                Swal.fire('Sin registros', data.mensaje, "info");
            }
        }
    });
}

function listar_eventos(datos){
    if(table_eventos != null){
    table_eventos.clear().draw();
    table_eventos.destroy();
    }
    $("#tabla_eventos").html('');
    table_eventos = $("#tabla_eventos").DataTable({
        "order": [],
        scrollY: true,
        scrollCollapse: true,
        "targets": "no-sort",
        "ordertable": false,
        data: datos,
        "columns":[
            {title: "Evento", "data":"Nombre_Evento"},
            {title: "Fecha Evento", "data":"Fecha_Evento"},
            {title: "Acciones", "data":"id_Evento"},
        ],

        createdRow: function(row, data, index){
            if(data.id_evento != ''){
                $("td", row).eq(2).html(`
                    <a href='resultados.php?id=${data.id_Evento}' role='button' class='btn btn-primary'>
                        Ver partidos <i class="fa-solid fa-circle-arrow-right"></i>
                    </a>
                `);
            }else{
                $("td", row).eq(2).html('');
            }
        },

        "columnDefs": [
        { width: "auto", targets: "_all" },
        {"className": "text-center", "targets": "_all"}
        ],

        fixedColumns: true,
    
        "language": idioma_espanol,
        
        initComplete: function(settings, json) {
        $("#tabla_eventos").removeClass("hide");
        $("#tabla_eventos").show();
        $("#cargando_tabla").hide();
    }
    });
}

function cargar_combo_eventos(datos){
	if (datos.length != 0) {
		for (let i = 0; i < datos.length; i++) {
			$("#eventos").append(`
			<option value="${datos[i].id_Evento}">${datos[i].Nombre_Evento}</option>
			`);	
		}
	}
}

$("#guardar_evento").on("click", function(e){
    e.preventDefault();
    $("#guardar_evento").addClass("deshabilitar");
  	$('#guardar_evento').attr("disabled", true);
      let evento = $("#nombre_evento_creado").val(),
      fecha_evento = $("#fecha_evento_creado").val();
      if (evento === '' || evento === 0) {
          Swal.fire('El Nombre del evento es requerido', '', 'info');
          $("#guardar_evento").removeAttr("disabled, disabled");
          $("#guardar_evento").removeClass("deshabilitar");
          $('#guardar_evento').attr("disabled", false);
          return false;
      }else if (fecha_evento === '') {
          Swal.fire('La fecha del evento es requerido', '', 'info');
          $("#guardar_evento").removeAttr("disabled, disabled");
          $("#guardar_evento").removeClass("deshabilitar");
          $('#guardar_evento').attr("disabled", false);
          return false;
      }
      $.ajax({
          url: "../utileria.php",
          type: "post",
          data: {"param":18, "evento":evento, "fecha_evento":fecha_evento, 
          "usuario":nombre_global},
          success: function(result) {
              let data = JSON.parse(result);
              if (data.estatus == 'success') {
                  Swal.fire( 
                      data.mensaje,
                      '',
                      'success'
                  );
                  $("#nombre_evento_creado").val("");
                  $("#fecha_evento_creado").val("");
                  $("#guardar_evento").removeAttr("disabled, disabled");
                  $("#guardar_evento").removeClass("deshabilitar");
                  $('#guardar_evento').attr("disabled", false);
                  listado_eventos();
              }else{
                  Swal.fire( 
                      data.mensaje,
                      '',
                      'info'
                  );
                  $("#guardar_evento").removeAttr("disabled, disabled");
                  $("#guardar_evento").removeClass("deshabilitar");
                  $('#guardar_evento').attr("disabled", false);
              }
          }
    });
});

$("#crear_evento").on("click", function(e){
    e.preventDefault();
    $("#nombre_evento_creado").val("");
    $("#fecha_evento_creado").val("");
});

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