<?php
	//
	// $serverName = "VMSQL2008";
	//$serverName = "VMDYNAMICSAXDEV";
	// $serverName = "vmdynamicsaxdev";
	// $connectionInfo = array( "Database"=>"Consultas", "UID"=>"Consulta", "PWD"=>"Consulta");
	// $conn = sqlsrv_connect( $serverName, $connectionInfo);
	$serverName = "172.20.28.80";
	$connectionInfo = array( "Database"=>"dbweb_GrandSlam", "UID"=>"usr_webgrandslam", "PWD"=>"GrandS14mUser23");
	$conn = sqlsrv_connect( $serverName, $connectionInfo);
	$validar = true;

	if( !$conn ) {
		$validar = false;
		$mensaje = '';
		$data = array(
			"estatus" => 'error_consulta',
			"Validar" => $validar,
			"mensaje" => 'No se pudo establecer la conexión.'
		);
		echo json_encode($data);
		die();	
	}

?>