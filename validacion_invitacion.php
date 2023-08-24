<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Invitación</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css">
  <!-- icheck bootstrap -->
  <link rel="stylesheet" href="plugins/icheck-bootstrap/icheck-bootstrap.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="dist/css/adminlte.min.css">
  <!--Mis estilos -->
  <link rel="stylesheet" href="assets/css/style.css">
  <!-- MDB icon -->
  <link rel="icon" href="assets/img/icon2.png" type="image/x-icon" />
</head>
<body class="hold-transition login-page body_login">
  <!-- /.login-logo -->
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
        <img src="assets/img/logo_slam.png" width="450" height="150" alt="ARZYZ" class="img-responsive">
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
        <div class="card">
            <div class="card-body">
                <p class="login-box-msg">Registro para Premiación</p>
                <div class="row form-group">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label for="">Número de Federación(FMT)</label>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <input type="text" name="no_fmt" id="no_fmt" placeholder="Número de Federación" class="form-control">
                    </div>
                </div>
                <div id="btn_ocultar" class="row form-group">
                    <!-- /.col -->
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <button class="btn btn-primary btn-block btn-login" id="btn_verificar">Verificar Participante</button>
                    </div>
                    <!-- /.col -->
                </div>
                <div id="oculto_fmt" style="display:none;">
                    <div class="row form-group">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label for="">Número de Nuevo León</label>
                        </div>
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <input type="text" name="no_nl" id="no_nl" placeholder="Número de Nuevo León" class="form-control" disabled>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label for="">Nombre Jugador</label>
                        </div>
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <input type="text" name="nombre_jugador" id="nombre_jugador" placeholder="Nombre del jugador" class="form-control" disabled>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label for="">Categoria Jugador</label>
                        </div>
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <input type="text" name="categoria" id="categoria" placeholder="Categoria" class="form-control" disabled>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label for="">Club Jugador</label>
                        </div>
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <input type="text" name="club" id="club" placeholder="Club" class="form-control" disabled>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label for="">Acompañante ( solo 1)</label>
                        </div>
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label class="content-input">
                                <input type="checkbox" name="acompanantes" id="acompanantes" value="0">
                                <i><span class="span_no">NO</span></i>
                            </label>
                        </div>
                    </div>
                    <div class="row">
                        <!-- /.col -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <button class="btn btn-primary btn-block btn-login" id="btn_enviar_invitacion">Registra Invitación</button>
                        </div>
                        <!-- /.col -->
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <label for="">Nota:<p class="aviso">Revisa el número de federación en tu gafet, en caso de tener alguna duda,<br> favor de contactarse al siguiente correo: paola.benitez@arzyz.com</p></label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <img src="assets/img/instrucciones.png" width="450" height="350" alt="ARZYZ" class="img-responsive">
                    </div>
                </div>
            </div>
            <!-- /.card-body -->
        </div>
        <!-- /.card -->
    </div>
  </div>
<!-- /.login-box -->
<!-- <footer class="footer_login">
    <img src="assets/img/TipsAnonimos.jpg" style="width: 100%;">
</footer> -->
<!-- jQuery -->
<script src="plugins/jquery/jquery.min.js"></script>
<script src="plugins/moment/moment.min.js"></script>
<!-- Bootstrap 4 -->
<script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- AdminLTE App -->
<script src="dist/js/adminlte.min.js"></script>
<script src="assets/js/sweetalert2.js"></script>
<script src="assets/js/validacion_invitacion.js?t=<?=time()?>"></script>
</body>
</html>
