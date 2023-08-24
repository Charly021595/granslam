let bandera_partners = 0,
limite_peticiones = 0;
const fecha_finalizacion = '2023/05/27';

jQuery(function () {
    validar_registro();
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

function validar_registro(){
	let date = new Date();
	let fecha_actual = moment(date).format('YYYY/MM/DD');
	if (fecha_actual > fecha_finalizacion){
        Swal.fire('El periodo de registro esta desactivado', "Te recordamos esperar a un proximo evento","info");
		$("#btn_verificar").addClass("deshabilitar");
  		$('#btn_verificar').attr("disabled", true);
        $("#btn_enviar_invitacion").addClass("deshabilitar");
  		$('#btn_enviar_invitacion').attr("disabled", true);
        return false;
    }
}

$("#btn_verificar").on("click", function(e){
    validar_registro();
    $("#oculto_fmt").hide();
    let no_fmt = $("#no_fmt").val();
    $.ajax({
        url: "./utileria.php",
        type: "post",
        data: {"param":21, "no_fmt":no_fmt},
        success: function(result) {
            let data = JSON.parse(result);
            if (data.estatus == 'success') {
                $("#oculto_fmt").show();
                let datos = data.data;
                $("#no_nl").val(datos[0].NoNL);
                $("#nombre_jugador").val(datos[0].Nombre_Completo);
                $("#categoria").val(datos[0].Nombre_Categoria);
                $("#club").val(datos[0].Club);
                $("#btn_ocultar").hide();
            }else{
                Swal.fire( 
                    data.mensaje,
                    '',
                    'error'
                );
            }
        }
    });
});

$("#acompanantes").on("click", function(){
    if( $('#acompanantes').prop('checked') ) {
        bandera_partners = 1;
    }else{
        bandera_partners = 0;
    }
});

$("#acompanantes").on("click", function(){
    if( $('#acompanantes').prop('checked') ) {
        bandera_partners = 1;
    }else{
        bandera_partners = 0;
    }
});

$("#btn_enviar_invitacion").on("click", function(e){
    e.preventDefault();
    $("#btn_enviar_invitacion").addClass("deshabilitar");
  	$('#btn_enviar_invitacion').attr("disabled", true);
    let numero_nl = $("#no_nl").val(),
    numero_fmt = $("#no_fmt").val(),
    categoria = $("#categoria").val(),
    nombre_jugador = $("#nombre_jugador").val(),
    club = $("#club").val();
    if (numero_nl === '' || numero_nl === 0) {
        Swal.fire('El Número de Nuevo León es requerido', '', 'info');
        $("#btn_enviar_invitacion").removeAttr("disabled, disabled");
        $("#btn_enviar_invitacion").removeClass("deshabilitar");
        $('#btn_enviar_invitacion').attr("disabled", false);
        return false;
    }else if (numero_fmt === '') {
        Swal.fire('El Número de Federacióm es requerido', '', 'info');
        $("#btn_enviar_invitacion").removeAttr("disabled, disabled");
        $("#btn_enviar_invitacion").removeClass("deshabilitar");
        $('#btn_enviar_invitacion').attr("disabled", false);
        return false;
    }else if (categoria === '' || categoria === 0) {
        Swal.fire('La Categoria es requerida', '', 'info');
        $("#btn_enviar_invitacion").removeAttr("disabled, disabled");
        $("#btn_enviar_invitacion").removeClass("deshabilitar");
        $('#btn_enviar_invitacion').attr("disabled", false);
        return false;
    }else if (nombre_jugador === '') {
        Swal.fire('El Nombre del Jugador es requerido', '', 'info');
        $("#btn_enviar_invitacion").removeAttr("disabled, disabled");
        $("#btn_enviar_invitacion").removeClass("deshabilitar");
        $('#btn_enviar_invitacion').attr("disabled", false);
        return false;
    }else if (club === '') {
        Swal.fire('El Club es requerido', '', 'info');
        $("#btn_enviar_invitacion").removeAttr("disabled, disabled");
        $("#btn_enviar_invitacion").removeClass("deshabilitar");
        $('#btn_enviar_invitacion').attr("disabled", false);
        return false;
    }
    $.ajax({
        url: "./utileria.php",
        type: "post",
        data: {"param":22, "numero_nl":numero_nl, "numero_fmt":numero_fmt, 
        "categoria":categoria, "nombre_jugador":nombre_jugador, 
        "club":club, "partners":bandera_partners, "limite_peticiones":limite_peticiones},
        success: function(result) {
            let data = JSON.parse(result);
            if (data.estatus == 'success') {
                if (data.mensaje[0].Duplicados == 1) {
                    Swal.fire( 
                        data.mensaje[0].Respuestas,
                        '',
                        'success'
                    );
                    $("#no_nl").val("");
                    $("#no_fmt").val("");
                    $("#categoria").val("");
                    $("#nombre_jugador").val("");
                    $("#club").val("");
                    $("#acompanantes").val(0);
                    $("#oculto_fmt").hide();
                    $("#btn_ocultar").show();
                    limite_peticiones++;
                }else{
                    Swal.fire( 
                        data.mensaje[0].Respuestas,
                        '',
                        'info'
                    );
                }
            }else if(ata.estatus == 'peticiones_excesivas'){
                Swal.fire( 
                    data.mensaje,
                    '',
                    'info'
                );
            }else{
                Swal.fire( 
                    'No coincide tu información',
                    '',
                    'info'
                );
                
            }
            setTimeout(activar_boton_enviar(), 8000);
        }
    });
});

function activar_boton_enviar() {
    $("#btn_enviar_invitacion").removeAttr("disabled, disabled");
    $("#btn_enviar_invitacion").removeClass("deshabilitar");
    $('#btn_enviar_invitacion').attr("disabled", false);
}
    