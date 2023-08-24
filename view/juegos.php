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
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
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
            <a href="check_user.php" class="nav-link">
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
            <a href="juegos.php" class="nav-link active">
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
            <h1 class="m-0">Partidos</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="../dashboard.php">Inicio</a></li>
              <li class="breadcrumb-item active">Partidos</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
        <input type="text" style="display:none;" class="form-control" id="txtNumEmpleado" value="<?php echo $_SESSION['Usuario']; ?>" disabled>
        <!-- filtros -->
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div class="card">
              <div class="card-header color_fratech letra_iconos_blancos">Filtros</div>
              <div class="card-body">
                <div class="row">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                    <div class="row">
                      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                        <div class="form-group">
                          <label for="">Evento</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div class="form-group">
                          <select name="evento" id="evento" class="form-control">
                            <option value="">Selecciona una Evento</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div class="form-group">
                          <label for="">Cancha</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div class="form-group">
                          <select name="cancha" id="cancha" class="form-control">
                            <option value="">Selecciona una cancha</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div class="form-group">
                          <label for="">Modalidad</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div class="form-group">
                          <select name="modalidad" id="modalidad" class="form-control">
                            <option value="">Selecciona una Modalidad</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div class="form-group">
                          <label for="">Nombre Jugador</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div class="form-group">
                          <input type="text" name="jugador" id="jugador" class="form-control" placeholder="Nombre Jugador">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <div class="form-group">
                      <button id="buscar_partidos" class="btn btn-primary float-right">Buscar</button>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <div id="qrcode"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- boton que abre modal -->
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <button id="crear_partido" class="btn btn-primary float-right" style="margin-bottom: 2px;" data-toggle="modal" data-target="#nuevo_partido">Crear Nuevo Partido</button>
          </div>
        </div>
        <!-- tabla listado -->
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div class="card">
              <div class="card-header bg-success centrar_texto">Listado Partidos</div>
              <div class="card-body bg-primary">
                <div class="row" id="cargando_tabla">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 centrar_texto">
                    <img id="cargando_tabla_partidos" class="cargando_tablas" src="../assets/img/loading.gif">
                  </div>
                </div>
                <div class="row" id="mostrar_partidos" style="display:none;">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <!-- <table id="tabla_partidos" class="table table-hover table-bordered table-hover  table-responsive-md 
                    table-responsive-lg table-responsive-xl table-responsive-xxl" style="width: 100%;">
                    </table>  -->
                    <div id="carouselExampleInterval" class="carousel slide" data-ride="carousel">
                      <div class="carousel-inner" id="carousel_torneo">
                        
                      </div>
                      <button class="carousel-control-prev flechas_carousel_left" type="button" data-target="#carouselExampleInterval" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                      </button>
                      <button class="carousel-control-next flechas_carousel_right" type="button" data-target="#carouselExampleInterval" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <h3 id="fecha_partidos" class="float-right"></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Small boxes (Stat box) -->

        <!-- Modal -->
        <div class="modal fade" id="nuevo_partido" tabindex="-1" data-backdrop="static" data-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header color_fratech letra_iconos_blancos">
                <h5 class="modal-title" id="exampleModalLabel">Crear Nuevo Partido</h5>
                <button id="cruz_cerrar_modal" type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <!-- inicio corte -->
                <div class="row form-group">
                  <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                      <label for="">Leer QR</label>
                  </div>
                  <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10">
                    <!-- <video id="preview" style="width: 100%;"></video> -->
                    <div id="reader"></div>
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Evento</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <select name="add_evento" id="add_evento" class="form-control">
                      <option value="">Selecciona un Evento</option>
                    </select>
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Cancha</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <select name="add_cancha" id="add_cancha" class="form-control">
                      <option value="">Selecciona una cancha</option>
                    </select>
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Número Jugador 1</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <input type="text" class="form-control" name="id_jugador_uno" id="id_jugador_uno" placeholder="Número Jugador 1">
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Número FMT Jugador 1</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <input type="text" class="form-control" name="id_fmt_jugador_uno" id="id_fmt_jugador_uno" placeholder="Número FMT Jugador 1">
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Nombre Jugador 1</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <input type="text" class="form-control" name="nombre_jugador_uno" id="nombre_jugador_uno" placeholder="Nombre Jugador 1">
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Número Jugador 2</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <input type="text" class="form-control" name="numero_jugador_dos" id="numero_jugador_dos" placeholder="Número Jugador 2">
                    </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Número FMT Jugador 2</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <input type="text" class="form-control" name="numero_fmt_jugador_dos" id="numero_fmt_jugador_dos" placeholder="Número FMT Jugador 2">
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Nombre Jugador 2</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <input type="text" class="form-control" name="nombre_jugador_dos" id="nombre_jugador_dos" placeholder="Nombre Jugador 2">
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Rama</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <select class="form-control" name="rama_crear_partido" id="rama_crear_partido">
                    </select>
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Modalidad</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <select class="form-control" name="modalidad_crear_partido" id="modalidad_crear_partido" onchange="modalidad_crear_partido()">
                      <option value="">Selecciona una Modalidad</option>
                      <option value="1">Singles</option>
                      <option value="2">Parejas</option>
                    </select>
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Fecha Partido</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <input type="datetime-local" name="fecha_crear_partido" id="fecha_crear_partido" class="form-control">
                    
                  </div>
                </div>
                <div id="acompanantes" style="display:none;">
                  <div class="row form-group">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label for="">Número acompañante 1</label>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <input type="text" class="form-control" placeholder="Número de Acompañante 1" name="id_acompanante_uno" id="id_acompanante_uno">
                    </div>
                  </div>
                  <div class="row form-group">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label for="">Número FMT acompañante 1</label>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <input type="text" class="form-control" name="numero_fmt_acompanante_uno" id="numero_fmt_acompanante_uno" placeholder="Número Acompañante 1">
                    </div>
                  </div>
                  <div class="row form-group">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Nombre acompañante 1</label>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <input type="text" class="form-control" placeholder="Nombre de Acompañante 1" name="nombre_acompanante_uno" id="nombre_acompanante_uno">
                    </div>
                  </div>
                  <div class="row form-group">
                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                          <label for="">Número acompañante 2</label>
                      </div>
                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <input type="text" class="form-control" placeholder="Número de Acompañante 2" name="id_acompanante_dos" id="id_acompanante_dos">
                      </div>
                  </div>
                  <div class="row form-group">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label for="">Número FMT acompañante 2</label>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <input type="text" class="form-control" name="numero_fmt_acompanante_dos" id="numero_fmt_acompanante_dos" placeholder="Número Acompañante 1">
                    </div>
                  </div>
                  <div class="row form-group">
                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                          <label for="">Nombre acompañante 2</label>
                      </div>
                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <input type="text" class="form-control" placeholder="Nombre de Acompañante 2" name="nombre_acompanante_dos" id="nombre_acompanante_dos">
                      </div>
                  </div>
                </div>
                <!-- fin corte -->
              </div>
              <div class="modal-footer">
                <button id="btn_cerrar" type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button id="btn_guardar_partido" type="button" class="btn btn-primary">Guardar Partido</button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="editar_juegos" tabindex="-1" data-backdrop="static" data-keyboard="false" aria-labelledby="exampleModalLabel_editar" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header color_fratech letra_iconos_blancos">
                <h5 class="modal-title" id="exampleModalLabel">Editar Partido</h5>
                <button id="cruz_cerrar_editar_modal" type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <input type="hidden" class="form-control" name="id_evento_editar" id="id_evento_editar">
                <input type="hidden" class="form-control" name="id_juego_editar" id="id_juego_editar">
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Editar Cancha</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <select name="editar_cancha" id="editar_cancha" class="form-control">
                      <option value="">Selecciona una cancha</option>
                    </select>
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Editar Número Jugador 1</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <input type="text" class="form-control" name="id_jugador_uno_editar" id="id_jugador_uno_editar" placeholder="Número Jugador 1" disabled>
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Editar Número FMT Jugador 1</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <input type="text" class="form-control" name="id_fmt_jugador_uno_editar" id="id_fmt_jugador_uno_editar" placeholder="Número Jugador 1" disabled>
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Nombre Jugador 1</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <input type="text" class="form-control" name="nombre_jugador_uno_editar" id="nombre_jugador_uno_editar" placeholder="Nombre Jugador 1" disabled>
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Jugador 1 Set 1</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <input type="number" class="form-control" name="resultado_uno_jugador_uno" id="resultado_uno_jugador_uno" placeholder="Jugador 1 Primer Set">
                    </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Jugador 1 Set 2</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <input type="number" class="form-control" name="resultado_dos_jugador_uno" id="resultado_dos_jugador_uno" placeholder="Jugador 1 Segundo Set">
                    </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Jugador 1 Set 3</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <input type="number" class="form-control" name="resultado_tres_jugador_uno" id="resultado_tres_jugador_uno" placeholder="Jugador 1 Tercer Set">
                    </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Número Jugador 2</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <input type="text" class="form-control" name="numero_jugador_dos_editar" id="numero_jugador_dos_editar" placeholder="Número Jugador 2" disabled>
                    </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Nombre Jugador 2</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <input type="text" class="form-control" name="nombre_jugador_dos_editar" id="nombre_jugador_dos_editar" placeholder="Nombre Jugador 2" disabled>
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Editar Número FMT Jugador 2</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <input type="text" class="form-control" name="id_fmt_jugador_dos_editar" id="id_fmt_jugador_dos_editar" placeholder="Número Jugador 1" disabled>
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Jugador 2 Set 1</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <input type="number" class="form-control" name="resultado_uno_jugador_dos" id="resultado_uno_jugador_dos" placeholder="Jugador 2 Primer Set">
                    </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Jugador 2 Set 2</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <input type="number" class="form-control" name="resultado_dos_jugador_dos" id="resultado_dos_jugador_dos" placeholder="Jugador 2 Segundo Set">
                    </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Jugador 3 Set 3</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <input type="number" class="form-control" name="resultado_tres_jugador_dos" id="resultado_tres_jugador_dos" placeholder="Jugador 2 Tercer Set">
                    </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Modalidad</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <select class="form-control" name="modalidad_crear_partido_editar" onchange="editar_modalidad()" id="modalidad_crear_partido_editar">
                      <option value="">Selecciona una Modalidad</option>
                      <option value="1">Singles</option>
                      <option value="2">Parejas</option>
                    </select>
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Fecha Partido</label>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <input type="datetime-local" name="fecha_crear_partido_editar" id="fecha_crear_partido_editar" class="form-control">
                  </div>
                </div>
                <div id="acompanantes_editar" style="display:none;">
                  <div class="row form-group">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label for="">Número acompañante 1</label>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <input type="text" class="form-control" placeholder="Número de Acompañante 1" name="id_acompanante_uno_editar" id="id_acompanante_uno_editar" disabled>
                    </div>
                  </div>
                  <div class="row form-group">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label for="">Número FMT acompañante 1</label>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <input type="text" class="form-control" placeholder="Número de Acompañante 1" name="id_fmt_acompanante_uno_editar" id="id_fmt_acompanante_uno_editar" disabled>
                    </div>
                  </div>
                  <div class="row form-group">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Nombre acompañante 1</label>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <input type="text" class="form-control" placeholder="Nombre de Acompañante 1" name="nombre_acompanante_uno_editar" id="nombre_acompanante_uno_editar" disabled>
                    </div>
                  </div>
                  <div class="row form-group">
                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                          <label for="">Número acompañante 2</label>
                      </div>
                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <input type="text" class="form-control" placeholder="Número de Acompañante 2" name="id_acompanante_dos_editar" id="id_acompanante_dos_editar" disabled>
                      </div>
                  </div>
                  <div class="row form-group">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label for="">Número FMT acompañante 2</label>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <input type="text" class="form-control" placeholder="Número de Acompañante 2" name="id_fmt_acompanante_dos_editar" id="id_fmt_acompanante_dos_editar" disabled>
                    </div>
                  </div>
                  <div class="row form-group">
                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                          <label for="">Nombre acompañante 2</label>
                      </div>
                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <input type="text" class="form-control" placeholder="Nombre de Acompañante 2" name="nombre_acompanante_dos_editar" id="nombre_acompanante_dos_editar" disabled>
                      </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button id="btn_cerrar_editar" type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button id="btn_editar_partido" type="button" class="btn btn-primary">Editar Partido</button>
              </div>
            </div>
          </div>
        </div>
        <!-- /.row (main row) -->
      </div><!-- /.container-fluid -->
    </section>
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
<!-- instascan -->
<!-- <script src="../assets/js/instascan.min.js"></script> -->
<!-- qrcode -->
<!-- <script src="../assets/js/qrcode.js"></script> -->
<!-- nueva libreria -->
<script src="../assets/js/html5-qrcode.min.js"></script>
<!-- sweetalert -->
<script src="../assets/js/sweetalert2.js"></script>
<!-- mis js -->
<script src="../assets/js/juegos.js?t=<?=time()?>"></script>
</body>
</html>
