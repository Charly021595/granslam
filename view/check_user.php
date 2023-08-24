<?php
    session_start(); 
    if(!isset($_SESSION['Usuario'])){
        header('location:../index.php');
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Arzyz | Tenis</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <!-- <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css"> -->
  <link rel="stylesheet" href="../assets/fontawesome-free-6.4.0-web/css/all.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Tempusdominus Bootstrap 4 -->
  <link rel="stylesheet" href="../plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
  <!-- iCheck -->
  <link rel="stylesheet" href="../plugins/icheck-bootstrap/icheck-bootstrap.min.css">
  <!-- JQVMap -->
  <link rel="stylesheet" href="../plugins/jqvmap/jqvmap.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../dist/css/adminlte.min.css">
  <!-- overlayScrollbars -->
  <link rel="stylesheet" href="../plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="../plugins/daterangepicker/daterangepicker.css">
  <!-- summernote -->
  <link rel="stylesheet" href="../plugins/summernote/summernote-bs4.min.css">
  <!--Mis estilos -->
  <link rel="stylesheet" href="../assets/css/style.css?t=<?=time()?>">
  <!-- MDB icon -->
  <link rel="icon" href="../assets/img/icon2.png" type="image/x-icon" />
  <!-- DataTables -->
  <link rel="stylesheet" href="../assets/datatables/DataTables-1.13.4/css/dataTables.bootstrap4.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>
<body class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

  <!-- Preloader -->
  <div class="preloader flex-column justify-content-center align-items-center">
    <img class="animation__shake" src="../assets/img/icon2.png" alt="AdminLTELogo" height="60" width="60">
  </div>

  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light color_fratech">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fa-solid fa-bars letra_iconos_blancos"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="../dashboard.php" class="nav-link letra_iconos_blancos">Inicio</a>
      </li>
      <!-- <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">Contact</a>
      </li> -->
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Messages Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-solid fa-user letra_iconos_blancos"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <a href="#" class="dropdown-item">
            <!-- Usuario -->
            <div class="media">
              <img src="../assets/img/imagen_no_disponible.jpg" alt="User Avatar" class="img-size-50 mr-3 img-circle">
              <div class="media-body">
                <div class="row">
                  <div class="col-12">
                    <span id="NombreCont"></span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <span id="Fecha"></span>
                  </div>
                </div>
                <h3 class="dropdown-item-title">
                </h3>
              </div>
            </div>
            <!-- Usuario End -->
          </a>
          <div class="dropdown-divider"></div>
          <div class="row centrar_texto">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              <button class="btn btn-danger btn_salir" onclick="CerrarSesion();"><i class="fa-solid fa-right-from-bracket"></i> Salir</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="../dashboard.php" class="brand-link" style="background: #fff;">
      <img src="../assets/img/icon.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3">
      <span class="brand-text font-weight-light"><img src="../assets/img/logo2.jpg" style="width:70%;"></span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar color_fratech">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="../assets/img/imagen_no_disponible.jpg" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" id="nombre_lado_izquierdo" class="d-block"></a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item">
            <a href="../dashboard.php" class="nav-link">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
              </p>
            </a>
          </li>
          <li class="nav-header">OPCIONES</li>
          <li class="nav-item">
            <a href="check_users.php" class="nav-link active">
              <i class="fa-solid fa-user-check"></i> 
              <p>
                Verificar Jugadores
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="jugadores.php" class="nav-link">
                <i class="fa-solid fa-users"></i>
              <p>
                Jugadores
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="listado_premiacion.php" class="nav-link">
              <i class="fa-solid fa-clipboard-list"></i>
              <p>
                Listado Premiación
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="juegos.php" class="nav-link">
              <i class="nav-icon far fa-solid fa-address-book"></i>
              <p>
                Partidos
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="eventos.php" class="nav-link">
              <i class="nav-icon far fa-solid fa-solid fa-calendar-days"></i>
              <p>
                Eventos
              </p>
            </a>
          </li>
          <li class="nav-item" id="listado_eventos">
            <a id="a_listado_eventos" href="#" class="nav-link">
              <i class="nav-icon far fa-solid fa-table-tennis-paddle-ball"></i>
              <p>
                Historial
                <i class="fas fa-angle-left right"></i>
                <span id="numero_total" class="badge badge-info right"></span>
              </p>
            </a>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <h1 class="m-0">Verificar Jugadores</h1>
          </div><!-- /.col -->
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="../dashboard.php">Inicio</a></li>
              <li class="breadcrumb-item active">Verificar Jugadores</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
        <input type="text" style="display:none;" class="form-control" id="txtNumEmpleado" value="<?php echo $_SESSION['Usuario']; ?>" disabled>
        <!-- verificar listado -->
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div class="card">
              <div class="card-header bg-success centrar_texto">Verificar Jugador</div>
              <div class="card-body">
                  <div id="mostrar_qr" class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 centrar_texto">
                      <div class="row form-group">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                              <label for="">Verificar QR Jugador</label>
                          </div>
                      </div>
                      <div class="row form-group">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                          <!-- <video id="preview" style="width: 30%;"></video> -->
                          <div id="reader"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="datos_jugador" style="display:none;" class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <div class="row">
                        <div class="col-6">
                          <div class="row form-group">
                            <div id="foto_jugador" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 centrar_texto">
                              
                            </div>
                          </div>
                          <div class="row form-group">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 centrar_texto">
                                <label class="letras_titulo" for="">Foto del Jugador</label>
                            </div>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="row form-group">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                              <label class="letras_titulo" for="">Número de Nuevo León:  <label id="nl_jugador" class="letras_respuesta" for="nl_jugador"></label></label>
                            </div>
                            <!-- <div class="col-6">
                              <label id="nl_jugador" for="nl_jugador"></label>
                            </div> -->
                          </div>
                          <div class="row form-group">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                              <label class="letras_titulo" for="">Número de Federación Mexicana:  <label id="numero_fmt" class="letras_respuesta" for="numero_fmt"></label></label>
                            </div>
                            <!-- <div class="col-6">
                              <label id="numero_fmt" class="letras_respuesta" for="numero_fmt"></label>
                            </div> -->
                          </div>
                          <div class="row form-group">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                              <label class="letras_titulo" for="">Nombre Jugador:  <label id="nombre_jugador" class="letras_respuesta" for="nombre_jugador"></label></label>
                            </div>
                            <!-- <div class="col-6">
                              <label id="nombre_jugador" class="letras_respuesta" for="nombre_jugador"></label>
                            </div> -->
                          </div>
                          <div class="row form-group">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                              <label class="letras_titulo" for="">Categoria Jugador:  <label id="categoria" class="letras_respuesta" for="categoria"></label></label>
                            </div>
                            <!-- <div class="col-6">
                              <label id="categoria" class="letras_respuesta" for="categoria"></label>
                            </div> -->
                          </div>
                          <div class="row form-group">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                              <label class="letras_titulo" for="">Club Jugador:  <label id="club" class="letras_respuesta" for="club"></label></label>
                            </div>
                            <!-- <div class="col-6">
                              <label id="club" class="letras_respuesta" for="club"></label>
                            </div> -->
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                          <button id="verificar_jugador" class="btn btn-primary float-right">
                            Verificar Jugador
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <footer class="main-footer">
    <strong>Copyright &copy; 2022-2023</strong> 
      <!-- <a href="https://linkedin.com/in/leonardo-peña-379165208">Leonardo Peña</a></strong> -->
    <!-- Doofenshmirtz  -->
    <!-- Malvados y Asociados S.A de CV.  -->
    Todos los derechos reservados.
    <div class="float-right d-none d-sm-inline-block footer_descompuesto">
      <b>Version</b> 3.2.0
    </div>
  </footer>

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

<!-- jQuery -->
<script src="../plugins/jquery/jquery.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="../plugins/jquery-ui/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
  $.widget.bridge('uibutton', $.ui.button)
</script>
<!-- Bootstrap 4 -->
<script src="../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- daterangepicker -->
<script src="../plugins/moment/moment.min.js"></script>
<script src="../plugins/daterangepicker/daterangepicker.js"></script>
<!-- Tempusdominus Bootstrap 4 -->
<script src="../plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"></script>
<!-- Summernote -->
<script src="../plugins/summernote/summernote-bs4.min.js"></script>
<!-- overlayScrollbars -->
<script src="../plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
<!-- AdminLTE App -->
<script src="../dist/js/adminlte.js"></script>
<!-- datatables -->
<script src="../assets/datatables/datatables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.1/js/dataTables.bootstrap5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.3.2/js/dataTables.buttons.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
<script src="https://cdn.datatables.net/buttons/2.3.2/js/buttons.html5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.3.2/js/buttons.print.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/datatables-buttons-excel-styles@1.2.0/js/buttons.html5.styles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/datatables-buttons-excel-styles@1.2.0/js/buttons.html5.styles.templates.min.js"></script>
<!-- instascan -->
<!-- <script src="../assets/js/instascan.min.js"></script> -->
<!-- qrcode -->
<!-- <script src="../assets/js/qrcode.js"></script> -->
<!-- nueva libreria -->
<script src="../assets/js/html5-qrcode.min.js"></script>
<!-- Sweetalert -->
<script src="../assets/js/sweetalert2.js"></script>
<!-- encender la camara -->
<script src="../libraries/webcamjs/webcam.min.js"></script>
<!-- mis js -->
<script src="../assets/js/check_user.js?t=<?=time()?>"></script>
</body>
</html>
