<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Login Arzyz</title>

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
<div class="login-box">
  <!-- /.login-logo -->
  <div class="row">
    <div class="col-12">
        <img src="assets/img/logo.jpg" width="350" height="100" alt="ARZYZ" class="img-responsive">    
    </div>
  </div>
  <div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <p class="login-box-msg">Inicia Sessión</p>
                <div class="input-group mb-3">
                    <input type="text" id="username" name="username" class="form-control validanumericos" placeholder="No. Empleado" required />
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <span class="fas fa-user"></span>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                <input type="password" class="form-control" id="password" onkeyup="Validar()" placeholder="Contraseña" required />
                <div class="input-group-append">
                    <div class="input-group-text">
                    <span id="mostrar_password" style="cursor:pointer;" class="fas fa-solid fa-eye-slash"></span>
                    </div>
                </div>
                </div>
                <div class="row">
                <!-- /.col -->
                <div class="col-12">
                    <button class="btn btn-primary btn-block btn-login" id="login">Ingresar</button>
                </div>
                <!-- /.col -->
                </div>
            </div>
            <!-- /.card-body -->
        </div>
        <!-- /.card -->
    </div>
  </div>
</div>
<!-- /.login-box -->
<footer class="footer_login">
    <img src="assets/img/TipsAnonimos.jpg" style="width: 100%;">
</footer>
<!-- jQuery -->
<script src="plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- AdminLTE App -->
<script src="dist/js/adminlte.min.js"></script>
<script src="assets/js/sweetalert2.js"></script>
<script src="assets/js/login.js?t=<?=time()?>"></script>
</body>
</html>
