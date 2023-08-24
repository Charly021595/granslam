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
  <link rel="stylesheet" href="../assets/css/estilos_especiales_resultados.css">
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

  <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <div class="card">
        <div class="card-header mi_header_card">
          <!-- <div class="p-2">
            <img class="float-start" src="../assets/img/logo_slam2.jpg" style="margin-right: 70%;">
            <img class="float-right" src="../assets/img/logo_fratech.jpg">
          </div> -->
          <div class="row">
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
              <img class="float-start" src="../assets/img/logo_slam2.jpg" >
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <h1 class="letras_color_fratech">RAMA</h1>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <h1 id="nombre_rama"></h1>
                </div>
              </div>
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 centrar_texto">
                  <h1 class="letras_color_fratech">EVENTO</h1>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 centrar_texto">
                  <h1 id="nombre_evento"></h1>
                </div>
              </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 centrar_texto">
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <h1 class="letras_color_fratech">MODALIDAD</h1>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <h1 id="nombre_modalidad"></h1>
                </div>
              </div>
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
              <img class="float-right" src="../assets/img/logo_fratech.jpg" style="height: 50%;">
            </div>
          </div>
        </div>
        <div class="card-body bg-primary">
          <div class="row" id="cargando_tabla">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 centrar_texto">
              <img id="cargando_tabla_tenis" class="cargando_tablas" src="../assets/img/loading.gif">
            </div>
          </div>
          <div class="row" id="mostrar_tenis" style="display:none;">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              <div id="carouselExampleInterval" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner" id="carousel_torneo">
                  <!-- crear append desde javascript con los datos de los jugadores -->
                  
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
        <!-- <div class="card-footer bg-primary" style="text-align: end;">
          <h3 id="fecha_partidos"></h3>
        </div> -->
      </div>
    </div>
  
  <!-- /.content-wrapper -->
  <footer class="main-footer">
    <strong>Copyright &copy; 2022-2023 
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
<!-- Sweetalert -->
<script src="../assets/js/sweetalert2.js"></script>
<!-- datatables -->
<script src="../assets/datatables/datatables.min.js"></script>
<!-- <script src="../assets/datatables/js/dataTables.bootstrap5.min.js"></script>
<script src="../assets/datatables/js/dataTables.buttons.min.js"></script>
<script src="../assets/datatables/js/jszip.min.js"></script>
<script src="../assets/datatables/js/pdfmake.min.js"></script>
<script src="../assets/datatables/js/vfs_fonts.js"></script> -->

<!-- mis js -->
<script src="../assets/js/resultados.js?t=<?=time()?>"></script>
</body>
</html>
