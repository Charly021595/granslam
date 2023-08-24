let table_premiacion,
today_actual = '',
nombre_archivo = '',
datos = '';

jQuery(function () {
    BuscarEmpleadoLogeado();
	listado_eventos();
    cargargrid_jugadores();
    FechaHoraActual();
  });

function FechaHoraActual(){ 
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var minute = today.getMinutes();
    var hours = today.getHours();
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    today = 'Fecha: ' + dd + '/' + mm + '/' + yyyy;
    nombre_archivo = dd + '_' + mm + '_' + yyyy;
    today_actual = today;
  }

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

function cargargrid_jugadores(){
    $('#mostrar_premiacion').hide();
    $("#cargando_tabla").show();
    $.ajax({
        url: "../utileria.php",
        type: "post",
        data: {"param":23},
        success: function(result) {
            let data = JSON.parse(result);
            if (data.estatus == 'success') {
                datos = data.data;
                $("#cargando_tabla").hide();
                $('#mostrar_premiacion').show();
                listar_jugadores(datos);
            }else{
                Swal.fire('Sin registros', data.mensaje, "info");
            }
        }
    });
}
  
function listar_jugadores(datos){
    if(table_premiacion != null && table_premiacion != ''){
        table_premiacion.clear().draw();
        table_premiacion.destroy();
    }
    // $("#tabla_premiacion > tbody").html('');
    table_premiacion = $("#tabla_premiacion").DataTable({
        "order": [],
        "targets": "no-sort",
        "ordertable": false,
        data: datos,
        "columns":[
            {"data":"NoFMT"},
            {"data":"NoNL"},
            {"data":"Nombre"},
            {"data":"Categoria"},
            {"data":"ClubDeportivo"},
            {"data":"Acompanante"}
        ],

        createdRow: function(row, data, index){
            if (data.Acompanante > 0) {
                $("td", row).eq(5).html(`1 Invitado`);
            }else{
                $("td", row).eq(5).html(`Sin Invitados`);
            }
        },

        "columnDefs": [
            { width: "auto", targets: "_all" },
            {"className": "text-center", "targets": "_all"}
        ],

        fixedColumns: true,
    
        "language": idioma_espanol,

        dom: "<'row'<'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'<'row'"
        +"<'col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2'l>"
        +"<'col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 botones_datatables'B>"
        +"<'col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6'f>>>>"
                +"<rt>"
                +"<'row'<'col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'<'form-inline'"
                +"<'col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6'i>"
                +"<'col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 float-rigth'p>>>>",
        buttons: [
            // 'copy', 'csv', 'excel', 'pdf', 'print'
            {
            extend:'excelHtml5',
            text:'<i class="fa-solid fa-file-excel"></i>',
            titleAttr: 'Excel',
            filename: 'Listado_premiación',
            autoFilter: true,
            exportOptions: {
                stripHtml: true,
                columns: [ 0, 1, 2, 3, 4]
            },
            sheetName: 'Listado jugadores',
            excelStyles: {                  // Add an excelStyles definition
                template: "green_medium",  // Apply the 'blue_medium' template
            }
            },
            { 
            extend: 'pdfHtml5',
            text:'<i class="fa-solid fa-file-pdf"></i>',
            titleAttr: 'PDF',
            title:'Listado_premiación',
            exportOptions: {
                stripHtml: true,
                columns: [ 0, 1, 2, 3, 4]
            },
            // messageTop: today_actual,
            download: 'open',
            filename: 'Listado_premiación_pdf',
                customize:function(doc) {
                doc.styles.title = {
                    color: '#0xff525659',
                    fontSize: '20',
                    alignment: 'left'
                }
                doc.styles.message = {
                    color: 'black',
                    fontSize: '10',
                    alignment: 'right'
                }
                doc.styles.tableHeader = {
                    fillColor:'#0xff525659',
                    color:'white',
                    alignment:'left'
                }
                doc.styles.tableBodyEven = {
                    alignment: 'left'
                }
                doc.styles.tableBodyOdd = {
                    alignment: 'left'
                }
                doc.styles['td:nth-child(2)'] = { 
                    width: '100px'
                }
            }
            },
            {
            extend:'csvHtml5',
            text:'<i class="fa-solid fa-file-csv"></i>',
            titleAttr: 'CSV',
            filename: 'Listado_premiación_'+nombre_archivo,
            },
            {
            extend:'copyHtml5',
            text:'<i class="fa fa-clipboard" aria-hidden="true"></i>',
            titleAttr: 'Copiar',
            filename: 'Listado_premiación_'+nombre_archivo,
            },
            {
            extend:'print',
            text:'<i class="fa fa-print" aria-hidden="true"></i>',
            titleAttr: 'Imprimir',
            filename: 'Listado_premiación_'+nombre_archivo,
            },
        ],
        
        initComplete: function(settings, json) {
            $("#tabla_premiacion").removeClass("hide");
            $("#tabla_premiacion").show();
            $("#cargando_tabla").hide();
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