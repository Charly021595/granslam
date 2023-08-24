let bandera_login = true;

$("#login").on("click", function(e){
    $("#login").addClass("deshabilitar");
    $('#login').attr("disabled", true);
    e.preventDefault();
    let usuario = $("#username").val(),
    pasword = $("#password").val();
    if (usuario == '') {
            Swal.fire('La fecha esta vacía', '', 'info');
            $("#login").removeAttr("disabled, disabled");
            $("#login").removeClass("deshabilitar");
            $('#login').attr("disabled", false);
    }
        if (pasword == '') {
            Swal.fire('La fecha esta vacía', '', 'info');
            $("#login").removeAttr("disabled, disabled");
            $("#login").removeClass("deshabilitar");
            $('#login').attr("disabled", false);
        }
    $.ajax({
        url: "./utileria.php",
        type: "post",
        data: {"param":1, "username": usuario, "password": pasword},
        success: function(result) {
            let data = JSON.parse(result);
            if (data.estatus == 'success') {
            window.location='dashboard.php';
            }else{
                Swal.fire( 
                data.mensaje,
                '',
                'error'
                );
                $("#login").removeAttr("disabled, disabled");
                $("#login").removeClass("deshabilitar");
                $('#login').attr("disabled", false);
                return false;
            }
        }
    });
});

function Validar() {
	//var e = document.getElementById("password").value;
	var elInput = document.getElementById('password');
	elInput.addEventListener('keyup', function(e) {
	  var keycode = e.keyCode || e.which;
	  if (keycode == 13) {
		Login();
	  }
	});
}

$(function(){
  $('.validanumericos').keypress(function(e) {
	if(isNaN(this.value + String.fromCharCode(e.charCode))) 
     return false;
  })
  .on("cut copy paste",function(e){
	e.preventDefault();
  });
});

$("#mostrar_password").on("click", function(){
  let password = $("#password").val();
  if (password != '') {
    document.getElementById('password').type = bandera_login ? 'text' :'password';
    bandera_login = bandera_login ? false : true; 
  }
});