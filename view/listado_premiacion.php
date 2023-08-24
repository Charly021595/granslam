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
  <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css">
  <link rel="stylesheet" href="https://cdn.datatables.net/fixedcolumns/4.2.2/css/fixedColumns.dataTables.min.css">
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
            <a href="listado_premiacion.php" class="nav-link active">
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
            <h1 class="m-0">Jugadores</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="../dashboard.php">Inicio</a></li>
              <li class="breadcrumb-item active">Jugadores</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
        <input type="text" style="display:none;" class="form-control" id="txtNumEmpleado" value="<?php echo $_SESSION['Usuario']; ?>" disabled>
        
        <!-- tabla listado -->
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div class="card">
              <div class="card-header bg-success centrar_texto">Listado Premiación</div>
              <div class="card-body">
                <div class="row" id="cargando_tabla">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 centrar_texto">
                    <img id="cargando_tabla_premiacion" class="cargando_tablas" src="../assets/img/loading.gif">
                  </div>
                </div>
                <div class="row" id="mostrar_premiacion" style="display:none;">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <table id="tabla_premiacion" class="table table-hover table-bordered 
                    table-responsive-xs table-responsive-sm table-responsive-md 
                    table-responsive-lg table-responsive-xl table-responsive-xxl" style="width:100%;">
                      <thead>
                        <tr>
                            <th scope="col">No FMT</th>
                            <th scope="col">No N.L</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Club Deportivo</th>
                            <th scope="col">Acompañante</th>
                        </tr>
                      </thead>
                    </table> 
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
        <!-- Modal agregar jugador -->
        <!-- <div class="modal fade" id="nuevo_jugador" tabindex="-1" data-backdrop="static" data-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header color_fratech letra_iconos_blancos">
                <h5 class="modal-title" id="exampleModalLabel">Crear Nuevo Jugador</h5>
                <button id="CerrarModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row form-group">
                  <div class="col-6">
                      <label for="">Subir Excel</label>
                  </div>
                  <div class="col-6">
                    <label class="content-input">
                      <input type="checkbox" name="excel" id="excel" value="0">
                      <i><span class="span_no">NO</span></i>
                    </label>
                  </div>
                </div>
                <div id="div_excel" style="display:none;">
                  <form action="" method="post" id="form_jugadores_excel">
                    <div class="row form-group">
                      <div class="col-6">
                        <Label for="importar_jugadores">Importar Jugadores:</Label>
                      </div>
                      <div class="col-6">
                        <input type="file" id="file_excel" name="file_excel" accept=".xlsx" class="form-control">
                      </div>
                    </div>
                  </form>
                </div>
                <div id="div_manual">
                  <div class="row form-group">
                    <div class="col-6">
                        <label for="">Número Nuevo León</label>
                    </div>
                    <div class="col-6">
                      <input type="text" onchange="add_qrcode()" name="add_numero_leon" id="add_numero_leon" placeholder="Número de Nuevo León" class="form-control">
                    </div>
                  </div>
                  <div class="row form-group">
                    <div class="col-6">
                        <label for="">Número Federación</label>
                    </div>
                    <div class="col-6">
                      <input type="text" name="add_numero_fmt" onchange="add_qrcode()" id="add_numero_fmt" placeholder="Número de la Federación Mexicana" class="form-control">
                    </div>
                  </div>

                  <div class="row form-group">
                    <div class="col-6">
                        <label for="">Categoria</label>
                    </div>
                    <div class="col-6">
                      <select name="add_categoria" onchange="add_qrcode()" id="add_categoria" class="form-control">
                        <option value="">Selecciona una categoria</option>
                      </select>
                    </div>
                  </div>

                  <div class="row form-group">
                    <div class="col-6">
                        <label for="">Nombre</label>
                    </div>
                    <div class="col-6">
                      <input type="text" name="add_nombre_jugador" onchange="add_qrcode()" id="add_nombre_jugador" placeholder="Nombre Jugador" class="form-control">
                    </div>
                  </div>

                  <div class="row form-group">
                    <div class="col-6">
                        <label for="">Apellido Paterno</label>
                    </div>
                    <div class="col-6">
                      <input type="text" name="add_apellidoP" onchange="add_qrcode()" id="add_apellidoP" placeholder="Apellido Paterno" class="form-control">
                    </div>
                  </div>

                  <div class="row form-group">
                    <div class="col-6">
                        <label for="">Apellido Materno</label>
                    </div>
                    <div class="col-6">
                      <input type="text" name="add_apellidoM" id="add_apellidoM" onchange="add_qrcode()" add_qrcode() placeholder="Apellido Materno" class="form-control">
                    </div>
                  </div>

                  <div class="row form-group">
                    <div class="col-6">
                        <label for="">Club</label>
                    </div>
                    <div class="col-6">
                      <input type="text" name="add_club" id="add_club" placeholder="Club" class="form-control">
                    </div>
                  </div>

                  <div class="row form-group">
                    <div class="col-6">
                        <label for="">Rama</label>
                    </div>
                    <div class="col-6">
                      <select name="add_rama" id="add_rama" class="form-control">
                      </select>
                    </div>
                  </div>

                  <div class="row form-group">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                      <label for="">Foto Jugador</label>
                    </div>
                  </div>

                  <div class="row form-group">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                          <div id="my_camera" style="width: 200px; height: 250px;"></div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                          <button type="button" class="btn btn-success" id="BotonCamara" onClick="take_snapshot()"> Capturar</button>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                          <div id="results1" style="padding-top: 17%;"></div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                          <input type="text" class="form-control" id="img" id="img" style="display:none">
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="input_file_oculto" class="row form-group" style="display:none">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="">Subir foto</label>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <input type="file" class="form-control" id="img_subida" id="img_subida">
                    </div>
                  </div>

                  <div class="row form-group">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label for="">QR Code de Jugador</label>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <div id="add_qrcode"></div>
                    </div>
                  </div>

                </div>
              </div>
              <div class="modal-footer">
                <button id="btn_cerrar" type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button id="btn_guardar_jugador" type="button" class="btn btn-primary">Guardar Jugador</button>
              </div>
            </div>
          </div>
        </div> -->
        <!-- Modal Editar usuario -->
        <!-- <div class="modal fade" id="editar_jugador" tabindex="-1" data-backdrop="static" data-keyboard="false" aria-labelledby="exampleModalLabel_editar" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header color_fratech letra_iconos_blancos">
                <h5 class="modal-title" id="exampleModalLabel">Editar Jugador</h5>
                <button id="editar_cerrar_modal" type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                  <div class="row form-group">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label for="">Número Nuevo León</label>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <input type="text" onchange="editar_qrcode()" name="editar_numero_leon" id="editar_numero_leon" placeholder="Número de Nuevo León" class="form-control">
                    </div>
                  </div>
                  <div class="row form-group">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label for="">Número Federación</label>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <input type="text" name="editar_numero_fmt" onchange="editar_qrcode()" id="editar_numero_fmt" placeholder="Número de la Federación Mexicana" class="form-control">
                    </div>
                  </div>

                  <div class="row form-group">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label for="">Categoria</label>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <select name="editar_categoria" onchange="editar_qrcode()" id="editar_categoria" class="form-control">
                        <option value="">Selecciona una categoria</option>
                      </select>
                    </div>
                  </div>

                  <div class="row form-group">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label for="">Nombre</label>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <input type="text" name="editar_nombre_jugador" onchange="editar_qrcode()" id="editar_nombre_jugador" placeholder="Nombre Jugador" class="form-control">
                    </div>
                  </div>

                  <div class="row form-group">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label for="">Apellido Paterno</label>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <input type="text" name="editar_apellidoP" onchange="editar_qrcode()" id="editar_apellidoP" placeholder="Apellido Paterno" class="form-control">
                    </div>
                  </div>

                  <div class="row form-group">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label for="">Apellido Materno</label>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <input type="text" name="editar_apellidoM" id="editar_apellidoM" onchange="editar_qrcode()" placeholder="Apellido Materno" class="form-control">
                    </div>
                  </div>

                  <div class="row form-group">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label for="">Club</label>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <input type="text" name="editar_club" id="editar_club" placeholder="Club" class="form-control">
                    </div>
                  </div>

                  <div class="row form-group">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label for="">Rama</label>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <select name="editar_rama" id="editar_rama" class="form-control">
                        <option value="">Selecciona una rama</option>
                        <option value="1">Femenil</option>
                        <option value="2">Varonil</option>
                      </select>
                    </div>
                  </div>

                  <div class="row form-group">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                        <label for="">Foto Jugador</label>
                    </div>
                  </div>

                  <div class="row form-group" id="ocultar_camara">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                          <div id="editar_my_camera" style="width: 200px; height: 250px;"></div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12">
                          <button type="button" class="btn btn-success" id="BotonCamaraEditar" onClick="take_snapshot()"> Capturar</button>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                          <div id="results_editar2" style="padding-top: 17%;"></div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                          <input type="text" class="form-control" id="img_editar" id="img_editar" style="display:none">
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row form-group" id="foto_tomada">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <button class="btn btn-success" id="nueva_foto">Tomar Otra</button>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6" id="foto_editar">
                    </div>
                  </div>

                  <div class="row form-group">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label for="">QR Code de Jugador</label>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <div id="editar_qrcode"></div>
                    </div>
                  </div>
              </div>
              <div class="modal-footer">
                <button id="btn_cerrar_editar" type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button id="btn_editar_jugador" type="button" class="btn btn-primary">Editar Jugador</button>
              </div>
            </div>
          </div>
        </div> -->
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
    <div class="float-right d-none d-sm-inline-block">
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
<script src="../assets/datatables/FixedColumns-4.2.2/js/dataTables.fixedColumns.min.js"></script>
<script src="../assets/datatables/Buttons-2.3.6/js/dataTables.buttons.min.js"></script>
<script src="../assets/datatables/JSZip-2.5.0/jszip.min.js"></script>
<script src="../assets/datatables/pdfmake-0.1.36/pdfmake.min.js"></script>
<script src="../assets/datatables/pdfmake-0.1.36/vfs_fonts.js"></script>
<script src="../assets/datatables/Buttons-2.3.6/js/buttons.html5.min.js"></script>
<script src="../assets/datatables/Buttons-2.3.6/js/buttons.print.min.js"></script>
<!-- <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script> -->
<script src="https://cdn.datatables.net/1.13.1/js/dataTables.bootstrap5.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/datatables-buttons-excel-styles@1.2.0/js/buttons.html5.styles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/datatables-buttons-excel-styles@1.2.0/js/buttons.html5.styles.templates.min.js"></script>
<!-- instascan -->
<script src="../assets/js/instascan.min.js"></script>
<!-- qrcode -->
<script src="../assets/js/qrcode.js"></script>
<!-- Sweetalert -->
<script src="../assets/js/sweetalert2.js"></script>
<!-- <script src="../assets/js/jquery.table2excel.js"></script> -->

<!-- encender la camara -->
<script src="../libraries/webcamjs/webcam.min.js"></script>

<!-- Libreria para generar PDF-->
<script src="../libraries/jsPDF/dist/jspdf.min.js"></script>
<script src="../libraries/jsPDF/dist/jspdf.debug.js"></script>
<script src="../libraries/jsPDF/dist/jspdf.plugin.autotable.js"></script>
<!-- Fin Libreria para generar PDF-->

<!-- mis js -->
<script src="../assets/js/listado_premiacion.js?t=<?=time()?>"></script>
</body>
</html>
