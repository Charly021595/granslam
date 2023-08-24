<?php
	header('Content-Type: text/html; charset=utf-8');

	require 'PHPExcel/Classes/PHPExcel.php';

	$param = $_POST['param'];	
	switch($param) {
        case '1':
            $data = array();
			$query = array();
			$query2 = array();
			$username = $_POST['username'];
			$password = $_POST['password'];
			$mensaje = "";
			$validar = true;
			
			include './db/conectar2.php';
			$sql = "{call RHMet_LoginEncuesta(?, ?)}";
			$params = array($username, $password);
			$stmt = sqlsrv_query($conn, $sql, $params);

			if ( $stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}else{
				while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
					$record = array(
						"valido" => $row['valido'],
					);
					array_push($query, $record);
				}
				if(count($query) > 0){
					session_start();
					$_SESSION['Usuario'] = $username;
					$_SESSION['Hora_Session'] = date("Y-m-d H:i:s");

					$record2 = array(
						"NoEmpleado" => $_SESSION['Usuario']
					);

					array_push($query2,$record2);

					$data = array(
						"estatus" => "success",
						"data" => $query2
					);
				}else{
					$data = array(
						"estatus" => 'error',
						"mensaje" => "credenciales del usuario erroneas"
					);	
				}
				sqlsrv_free_stmt( $stmt);		
				sqlsrv_close($conn);
			}	

			ob_clean();//clears the output buffer
			echo json_encode($data);
        break;
        case '2': //Consulta
            $data = array();
            $empleado = $_POST['empleado'];
			$validar = true;
            $query = array();
            include './db/conectar2.php';
            $sql = "{call RHMet_ObtenerDatosEmpleado(?)}";
            $params = array($empleado);
            $stmt = sqlsrv_query($conn, $sql, $params);
            if ( $stmt === false ) {
                $validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
            }	
            while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
                $NombreEmpleado =  utf8_encode ($row['NombreCompleto']);
                $record = array(
                    "Empleado" => utf8_encode($row['Empleado']),
                    "Nombre" =>utf8_encode( $row['NombreCompleto'])!= null ? utf8_encode ($row['NombreCompleto']):"",
                    "Sede" =>utf8_encode( $row['Sede'])!= null ? utf8_encode ($row['Sede']):"",
                    "Tipo_Empleado" => $row['Turno'] != null ? $row['Turno'] : 0
                );
                array_push($query, $record);
            }
            if (count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay registros"
                );		
            }
            ob_clean();//clears the output buffer
            echo json_encode($data);
            sqlsrv_free_stmt($stmt);	

        break;
		case '3': //Consulta
			session_start();
			session_unset();
			session_destroy();
			echo json_encode("true");
		break;
		case '4': //Consulta
            $data = array();
            $id_evento = isset($_POST['id_evento']) ? $_POST['id_evento'] : 1;
			$modalidad = isset($_POST['modalidad']) ? $_POST['modalidad'] : null;
			$validar = true;
            $query = array();

            include './db/conectar.php';

            $sql = "{call GS_ObtenerPartidos(?, ?, ?)}";
			$params = array($id_evento, $modalidad, $rama);
            $stmt = sqlsrv_query($conn, $sql, $params);
            if ($stmt === false ) {
                $validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
            }	
            while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
                $record = array(
                    "id_juego" => $row['idJuego'],
					"id_evento" => $row['idEvento'],
					"nombre_evento" => utf8_encode($row['NombreEvento']),
                    "id_cancha" => $row['idCancha'],
					"cancha" => $row['Cancha'],
                    "no_jugador_uno" => $row['NoNLJugador1'],
                    "no_fmt_jugador_uno" => $row['NoFMTJugador1'],
					"nombre_jugador_uno" => utf8_encode($row['NombreJugador1']),
					"no_nl_jugador_dos" => $row['NoNLJugador2'],
                    "no_fmt_jugador_dos" => $row['NoFMTJugador2'],
                    "nombre_jugador_dos" => utf8_encode($row['NombreJugador2']),
					"resultado_set_uno_jugador_uno" => $row['ResultadoSet1Jugador1'],
                    "resultado_set_uno_jugador_dos" => $row['ResultadoSet1Jugador2'],
                    "resultado_set_dos_jugador_uno" => $row['ResultadoSet2Jugador1'],
					"resultado_set_dos_jugador_dos" => $row['ResultadoSet2Jugador2'],
                    "resultado_set_tres_jugador_uno" => $row['ResultadoSet3Jugador1'],
                    "resultado_set_tres_jugador_dos" => $row['ResultadoSet3Jugador2'],
					"no_nl_acompanante_uno" => $row['NoNLAcompanante1'],
                    "no_fmt_acompanante_uno" => $row['NoFMTAcompanante1'],
                    "nombre_acompanante_uno" => utf8_encode($row['NombreJugador1Acompanante']),
					"no_nl_acompanante_dos" => $row['NoNLJugador2'],
                    "no_fmt_acompanante_dos" => $row['NoFMTJugador2'],
                    "nombre_acompanante_dos" => utf8_encode($row['NombreJugador2Acompanante']),
					"fecha_hora_partido" => $row['FechaHoraPartido']->format('d/m/Y  H:i a'),
					"id_modalidad" => $row['Id_Modalidad'],
                    "nombre_modalidad" => utf8_encode($row['Nombre_Modalidad']),
                    "nombre_rama" => utf8_encode($row['Nombre_Rama'])
                );
                array_push($query, $record);
            }
            if (count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay registros"
                );		
            }
            ob_clean();//clears the output buffer
            echo json_encode($data);
            sqlsrv_free_stmt($stmt);	

        break;
		case '5': //Consulta
            $data = array();
			$validar = true;
            $query = array();

            include './db/conectar.php';
            $sql = "{call GS_ObtenerEventos()}";
            $stmt = sqlsrv_query($conn, $sql);

            if ($stmt === false ) {
                $validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
            }	
            while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
                $record = array(
                    "id_Evento" => $row['IdEvento'],
                    "Nombre_Evento" => utf8_encode($row['NombreEvento']),
					"Fecha_Evento" => $row['FechaEvento']->format('Y-m-d  h:i A'),
                    "Creado_por" => utf8_encode($row['CreadoPor']),
                    "Modificado_por" => utf8_encode($row['ModificadoPor'])
                );
                array_push($query, $record);
            }
            if (count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay registros"
                );		
            }
            ob_clean();//clears the output buffer
            echo json_encode($data);
            sqlsrv_free_stmt($stmt);	

        break;
		case '6': //Consulta
            $data = array();
			$validar = true;
            $query = array();

            include './db/conectar.php';
            $sql = "{call GS_ObtenerJugadores()}";
            $stmt = sqlsrv_query($conn, $sql);
            if ($stmt === false ) {
                $validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
            }	
            while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
                $record = array(
                    "NoNL" => $row['NoNL'],
                    "NoFMT" => $row['NoFMT'],
					"Categoria" => $row['Categoria'],
					"Nombre" => utf8_encode($row['Nombre']),
					"ApPaterno" => utf8_encode($row['ApPaterno']),
					"ApMaterno" => utf8_encode($row['ApMaterno']),
					"Club" => utf8_encode($row['Club']),
					"Rama" => $row['Rama'],
					"Nombre_Completo" => utf8_encode($row['NombreCompleto']),
                    "Nombre_Categoria" => utf8_encode($row['NombreCategoria']),
                    "Img" => $row['Img'],
					"ImgQR" => $row['ImgQR']
                );
                array_push($query, $record);
            }

            if (count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay registros"
                );		
            }
            ob_clean();//clears the output buffer
            echo json_encode($data);
            sqlsrv_free_stmt($stmt);	

        break;
		case '7': //Consulta
            $data = array();
			$validar = true;
            $query = array();

			$numero_nl = $_POST['numero_nl'];
			$nombre_jugador = $_POST['nombre_jugador'];
			$numero_fmt = $_POST['numero_fmt'];
			$categoria_jugador = $_POST['categoria_jugador'];

			// var_dump($numero_nl);
			// var_dump($nombre_jugador);
			// var_dump($numero_fmt);
			// die();

            include './db/conectar.php';
            $sql = "{call GS_EditarJugadores()}";
            $stmt = sqlsrv_query($conn, $sql);
            if ($stmt === false ) {
                $validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
            }	
            while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
                $record = array(
                    "NoNL" => $row['NoNL'],
                    "NoFMT" => $row['NoFMT'],
					"Nombre_Completo" => $row['NombreCompleto'],
                    "Nombre_Categoria" => $row['NombreCategoria'],
					"ImgQR" => $row['ImgQR']
                );
                array_push($query, $record);
            }
            if (count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay registros"
                );		
            }
            ob_clean();//clears the output buffer
            echo json_encode($data);
            sqlsrv_free_stmt($stmt);	

        break;
		case '8': //Consulta
            $data = array();
			$validar = true;
            $query = array();

			$numero_nl = isset($_POST['numero_nl']) ? $_POST['numero_nl'] : '';
			$numero_fmt = isset($_POST['numero_fmt']) ? $_POST['numero_fmt'] : '';
			$categoria = isset($_POST['categoria']) ? $_POST['categoria'] : '';
			$nombre_jugador = isset($_POST['nombre_jugador']) ? $_POST['nombre_jugador'] : '';
			$apellido_p = isset($_POST['apellido_p']) ? $_POST['apellido_p'] : '';
			$apellido_m = isset($_POST['apellido_m']) ? $_POST['apellido_m'] : '';
			$club = isset($_POST['club']) ? $_POST['club'] : '';
			$rama = isset($_POST['rama']) ? $_POST['rama'] : '';
			$img = isset($_POST['img']) ? $_POST['img'] : '';
			$imgqr = isset($_POST['imgqr']) ? $_POST['imgqr'] : '';
			$bandera = isset($_POST['bandera']) ? $_POST['bandera'] : 0;



            include './db/conectar.php';

			switch ($bandera) {
				case '0':
					$sql = "{call GS_GuardarJugadores(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
					$params = array($numero_nl, $numero_fmt, $categoria, utf8_decode($nombre_jugador), 
					utf8_decode($apellido_p), utf8_decode($apellido_m), utf8_decode($club), $rama, utf8_decode($img), utf8_decode($imgqr));
					// var_dump($params);
					// die();
					$stmt = sqlsrv_query($conn, $sql, $params);

					if ($stmt === false ) {
						$validar = false;
						$mensaje = sqlsrv_errors();
						$data = array(
							"estatus" => 'error_consulta',
							"Validar" => $validar,
							"mensaje" => $mensaje[0]['message']
						);
						echo json_encode($data);
						die();
					}	
				break;

				case '1':
					$nombre_archivo = $_FILES['file_excel']['name'];
					$tipo_archivo = $_FILES['file_excel']['type'];
					$tamano_archivo = $_FILES['file_excel']['size'];
					$extension = pathinfo($nombre_archivo, PATHINFO_EXTENSION);
					$allowedfileExtensions = array('xlsx');
					
					if (in_array($extension, $allowedfileExtensions)) {
						$directorio = 'archivos/';
						$subir_archivo = $directorio.basename("lista_jugadores.xlsx");

						if (move_uploaded_file($_FILES['file_excel']['tmp_name'], $subir_archivo)){
							$validar = true;
							$mensaje = '';
							$contador = 0;

							//Cargar nuestra hoja de excel
							$excel = PHPExcel_IOFactory::load($subir_archivo);

							//Cargar la hoja de calculo que queremos
							$excel->setActiveSheetIndex(0);

							$numerofila = $excel->setActiveSheetIndex(0)->getHighestRow();
							
							for ($i=2; $i <= $numerofila; $i++) { 
								if ($excel->getActiveSheet()->getCell('A'. $i)->getValue() == null) {
									break;
								}
								$numero_nl = $excel->getActiveSheet()->getCell('A'. $i)->getValue();
								$numero_fmt = "";
								$categoria = $excel->getActiveSheet()->getCell('C'. $i)->getValue();
								$nombre_jugador = $excel->getActiveSheet()->getCell('D'. $i)->getValue();
								$apellido_p = $excel->getActiveSheet()->getCell('E'. $i)->getValue();
								$apellido_m = $excel->getActiveSheet()->getCell('F'. $i)->getValue();
								$club = "";
								$rama = 1;
								$img = "";
								$imgqr = "";

								switch ($categoria) {
									case 'A':
										$categoria = 1;
									break;

									case 'B':
										$categoria = 2;
									break;

									case 'C':
										$categoria = 3;
									break;

									case 'D':
										$categoria = 4;
									break;

									case 'D-I':
										$categoria = 5;
									break;

									case 'ABIERTA':
										$categoria = 6;
									break;
								}

								$sql = "{call GS_GuardarJugadores(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
								// $params = array((int)$numero_nl, $numero_fmt, (int)$categoria, utf8_encode($nombre_jugador), 
								// utf8_encode($apellido_p), utf8_encode($apellido_m), utf8_encode($club), (int)$rama, utf8_encode($img), utf8_encode($imgqr));
								$params = array($numero_fmt, (int)$categoria, utf8_encode($nombre_jugador), 
								utf8_encode($apellido_p), utf8_encode($apellido_m), utf8_encode($club), (int)$rama, utf8_encode($img), utf8_encode($imgqr));
								// var_dump($params);
								// die();
								$stmt = sqlsrv_query($conn, $sql, $params);
								if ($stmt === false ) {
									$validar = false;
									$mensaje = sqlsrv_errors();
									$data = array(
										"estatus" => 'error_consulta',
										"Validar" => $validar,
										"mensaje" => $mensaje[0]['message']
									);
									echo json_encode($data);
									die();
								}	
							}
						}else{
							$data = array(
								"estatus" => "error",
								"validar" => "false",
								"mensaje" => "no se guardo correctamente"
							);
						}	
					}else{
						$data = array(
							"estatus" => "error",
							"validar" => "false",
							"mensaje" => "solo los archivos dee excel son permitidos"
						);
					}
				break;
				
				default:
					$data = array(
						"estatus" => "error",
						"validar" => "false",
						"mensaje" => "no se guardo correctamente"
					);
				break;
			}

            if ($validar){
                $data = array(
                    "estatus" => "success",
                    "mensaje" => "El jugador fue agregado exitosamente"
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay registros"
                );		
            }
            ob_clean();//clears the output buffer
            echo json_encode($data);
            sqlsrv_free_stmt($stmt);	

        break;
		case '9': //Consulta
            $data = array();
			$validar = true;
            $query = array();

            include './db/conectar.php';
            $sql = "{call GS_ObtenerCategoria()}";
            $stmt = sqlsrv_query($conn, $sql);
            if ($stmt === false ) {
                $validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
            }	
            while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
                $record = array(
                    "id_categoria" => $row['IdCategoria'],
                    "nombre_categoria" => $row['NombreCategoria']
                );
                array_push($query, $record);
            }
            if (count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay registros"
                );		
            }
            ob_clean();//clears the output buffer
            echo json_encode($data);
            sqlsrv_free_stmt($stmt);	

        break;
		case '10': //Consulta
            $data = array();
			$validar = true;
            $query = array();

            include './db/conectar.php';
            $sql = "{call GS_ObtenerCancha()}";
            $stmt = sqlsrv_query($conn, $sql);
            if ($stmt === false ) {
                $validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
            }	
            while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
                $record = array(
                    "id_cancha" => $row['idCancha'],
                    "nombre_cancha" => $row['Cancha']
                );
                array_push($query, $record);
            }
            if (count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay registros"
                );		
            }
            ob_clean();//clears the output buffer
            echo json_encode($data);
            sqlsrv_free_stmt($stmt);	

        break;
		case '11': //Consulta
            $data = array();
			$validar = true;
            $query = array();

			$update_juego = isset($_POST['update_juego']) ? $_POST['update_juego'] : 0;
			$update_evento = isset($_POST['update_evento']) ? $_POST['update_evento'] : 0;
			$update_cancha = isset($_POST['update_cancha']) ? $_POST['update_cancha'] : 0;
			// $update_numero_nl_jugador_uno = isset($_POST['update_numero_nl_jugador_uno']) ? $_POST['update_numero_nl_jugador_uno'] : 0;
			// $update_numero_fmt_jugador_uno = isset($_POST['update_numero_fmt_jugador_uno']) ? $_POST['update_numero_fmt_jugador_uno'] : "";
			// $update_nombre_jugador_uno = isset($_POST['update_nombre_jugador_uno']) ? $_POST['update_nombre_jugador_uno'] : '';
			$update_jugador_uno_set_uno = isset($_POST['update_jugador_uno_set_uno']) ? $_POST['update_jugador_uno_set_uno'] : 0;
			$update_jugador_uno_set_dos = isset($_POST['update_jugador_uno_set_dos']) ? $_POST['update_jugador_uno_set_dos'] : 0;
			$update_jugador_uno_set_tres = isset($_POST['update_jugador_uno_set_tres']) ? $_POST['update_jugador_uno_set_tres'] : 0;
			// $update_numero_nl_jugador_dos = isset($_POST['update_numero_nl_jugador_dos']) ? $_POST['update_numero_nl_jugador_dos'] : 0;
			// $update_numero_fmt_jugador_dos = isset($_POST['update_numero_fmt_jugador_dos']) ? $_POST['update_numero_fmt_jugador_dos'] : "";
			// $update_nombre_jugador_dos = isset($_POST['update_nombre_jugador_dos']) ? $_POST['update_nombre_jugador_dos'] : '';
			$update_jugador_dos_set_uno = isset($_POST['update_jugador_dos_set_uno']) ? $_POST['update_jugador_dos_set_uno'] : 0;
			$update_jugador_dos_set_dos = isset($_POST['update_jugador_dos_set_dos']) ? $_POST['update_jugador_dos_set_dos'] : 0;
			$update_jugador_dos_set_tres = isset($_POST['update_jugador_dos_set_tres']) ? $_POST['update_jugador_dos_set_tres'] : 0;
			// $update_numero_nl_acompanante_uno = isset($_POST['update_numero_nl_acompanante_uno']) ? $_POST['update_numero_nl_acompanante_uno'] : 0;
			// $update_numero_fmt_acompanante_uno = isset($_POST['update_numero_fmt_acompanante_uno']) ? $_POST['update_numero_fmt_acompanante_uno'] : "";
			// $update_nombre_acompanante_uno = isset($_POST['update_nombre_acompanante_uno']) ? $_POST['update_nombre_acompanante_uno'] : "";
			// $update_numero_nl_acompanante_dos = isset($_POST['update_numero_nl_acompanante_dos']) ? $_POST['update_numero_nl_acompanante_dos'] : 0;
			// $update_numero_fmt_acompanante_dos = isset($_POST['update_numero_fmt_acompanante_dos']) ? $_POST['update_numero_fmt_acompanante_dos'] : "";
			// $update_nombre_acompanante_dos = isset($_POST['update_nombre_acompanante_dos']) ? $_POST['update_nombre_acompanante_dos'] : "";
			$usuario = isset($_POST['usuario']) ? $_POST['usuario'] : "";
			$update_fecha_hora = isset($_POST['update_fecha_hora']) ? $_POST['update_fecha_hora'] : "";
			$update_modalidad = isset($_POST['update_modalidad']) ? $_POST['update_modalidad'] : '';

			$fecha_nuevo_formato = new DateTime($update_fecha_hora);

            include './db/conectar.php';

			// $sql = "{call GS_EditarPartido(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
			// $params = array($update_juego, $update_evento, $update_cancha, 
			// $update_numero_nl_jugador_uno, $update_numero_fmt_jugador_uno,
			// $update_numero_nl_jugador_dos, $update_numero_fmt_jugador_dos,
			// $update_jugador_uno_set_uno, $update_jugador_uno_set_dos, 
			// $update_jugador_uno_set_tres, $update_jugador_dos_set_uno, 
			// $update_jugador_dos_set_dos, $update_jugador_dos_set_tres,
			// $update_numero_nl_acompanante_uno, $update_numero_fmt_acompanante_uno,
			// $update_numero_nl_acompanante_dos, $update_numero_fmt_acompanante_dos,
			// $usuario, $fecha_nuevo_formato->format('Y-m-d H:i:s'), $update_modalidad);
			$sql = "{call GS_EditarPartido(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
			$params = array($update_juego, $update_evento, $update_cancha, 
			$update_jugador_uno_set_uno, $update_jugador_uno_set_dos, 
			$update_jugador_uno_set_tres, $update_jugador_dos_set_uno, 
			$update_jugador_dos_set_dos, $update_jugador_dos_set_tres,
			$usuario, $fecha_nuevo_formato->format('Y-m-d H:i:s'), $update_modalidad);
			$stmt = sqlsrv_query($conn, $sql, $params);

			if ($stmt === false ) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}

            if ($validar){
                $data = array(
                    "estatus" => "success",
                    "mensaje" => "El jugador fue agregado exitosamente"
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay registros"
                );		
            }
            ob_clean();//clears the output buffer
            echo json_encode($data);
            sqlsrv_free_stmt($stmt);	

        break;
		case '12': //Consulta
            $data = array();
			$validar = true;
            $query = array();

			$update_numero_nl = isset($_POST['update_numero_nl']) ? $_POST['update_numero_nl'] : 0 ;
			$update_numero_fmt = isset($_POST['update_numero_fmt']) ? $_POST['update_numero_fmt'] : '';
			$update_categoria = isset($_POST['update_categoria']) ? $_POST['update_categoria'] : 0;
			$update_nombre_jugador = isset($_POST['update_nombre_jugador']) ? $_POST['update_nombre_jugador'] : '';
			$update_apellido_p = isset($_POST['update_apellido_p']) ? $_POST['update_apellido_p'] : '';
			$update_apellido_m = isset($_POST['update_apellido_m']) ? $_POST['update_apellido_m'] : '';
			$update_club = isset($_POST['update_club']) ? $_POST['update_club'] : '';
			$update_rama = isset($_POST['update_rama']) ? $_POST['update_rama'] : 0;
			$update_img = isset($_POST['update_img']) ? $_POST['update_img'] : '';
			$update_imgqr = isset($_POST['update_imgqr']) ? $_POST['update_imgqr'] : '';
			$datos_jugadores = isset($_POST['datos']) && is_array($_POST['datos']) ? $_POST['datos'] : 0;
			$opcion = isset($_POST['datos']) && is_array($_POST['datos']) ? 1 : 0;

			include './db/conectar.php';
			switch ($opcion) {
				case '0':
					$sql = "{call GS_EditarJugadores(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
					$params = array($update_numero_nl, $update_numero_fmt, $update_categoria, 
					utf8_decode($update_nombre_jugador), utf8_decode($update_apellido_p), utf8_decode($update_apellido_m), utf8_decode($update_club), 
					$update_rama, $update_img, $update_imgqr);
					$stmt = sqlsrv_query($conn, $sql, $params);

					if ($stmt === false ) {
						$validar = false;
						$mensaje = sqlsrv_errors();
						$data = array(
							"estatus" => 'error_consulta',
							"Validar" => $validar,
							"mensaje" => $mensaje[0]['message']
						);
						echo json_encode($data);
						die();
					}

					if ($validar){
						$data = array(
							"estatus" => "success",
							"mensaje" => "Los datos se actualizaron correctamente"
						);
					}else{
						$data = array(
							"estatus" => 'error',
							"mensaje" => "no hay registros"
						);		
					}
					ob_clean();//clears the output buffer
					echo json_encode($data);
					sqlsrv_free_stmt($stmt);
				break;
				case '1':
					foreach ($datos_jugadores as $jugador) {
						$update_numero_nl = isset($jugador['NoNL']) ? $jugador['NoNL'] : 0 ;
						$update_numero_fmt = isset($jugador['NoFMT']) ? $jugador['NoFMT'] : '';
						$update_categoria = isset($jugador['Categoria']) ? $jugador['Categoria'] : 0;
						$update_nombre_jugador = isset($jugador['Nombre']) ? $jugador['Nombre'] : '';
						$update_apellido_p = isset($jugador['ApPaterno']) ? $jugador['ApPaterno'] : '';
						$update_apellido_m = isset($jugador['ApMaterno']) ? $jugador['ApMaterno'] : '';
						$update_club = isset($jugador['Club']) ? $jugador['Club'] : '';
						$update_rama = isset($jugador['Rama']) ? $jugador['Rama'] : 0;
						$update_img = isset($jugador['Img']) ? $jugador['Img'] : '';
						$update_imgqr = isset($jugador['ImgQR']) ? $jugador['ImgQR'] : '';
						// var_dump($update_numero_nl);
						// var_dump($update_numero_fmt);
						// var_dump($update_categoria);
						// var_dump($update_nombre_jugador);
						// var_dump($update_apellido_p);
						// var_dump($update_apellido_m);
						// var_dump($update_club);
						// var_dump($update_rama);
						// var_dump($update_img);
						// var_dump($update_imgqr);
						// die();
						$sql = "{call GS_EditarJugadores(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
						$params = array($update_numero_nl, $update_numero_fmt, $update_categoria, 
						utf8_encode($update_nombre_jugador), utf8_encode($update_apellido_p), utf8_encode($update_apellido_m), utf8_encode($update_club), 
						$update_rama, $update_img, $update_imgqr);
						$stmt = sqlsrv_query($conn, $sql, $params);
						if ($stmt === false ) {
							$validar = false;
							$mensaje = sqlsrv_errors();
							$data = array(
								"estatus" => 'error_consulta',
								"Validar" => $validar,
								"mensaje" => $mensaje[0]['message']
							);
							echo json_encode($data);
							die();
						}
					}
					if ($validar){
						$data = array(
							"estatus" => "success",
							"mensaje" => "Los datos se actualizaron correctamente"
						);
					}else{
						$data = array(
							"estatus" => 'error',
							"mensaje" => "no hay registros"
						);		
					}
					ob_clean();//clears the output buffer
					echo json_encode($data);
					sqlsrv_free_stmt($stmt);
				break;
			}
		break;
		case '13': //Consulta
            $data = array();
			$validar = true;
            $query = array();

			$id_evento = isset($_POST['id_evento']) ? $_POST['id_evento'] : 0;
			$cancha = isset($_POST['cancha']) ? $_POST['cancha'] : 0;
			$numero_nl_jugador_uno = isset($_POST['numero_nl_jugador_uno']) ? $_POST['numero_nl_jugador_uno'] : 0;
			$numero_fmt_jugador_uno = isset($_POST['numero_fmt_jugador_uno']) ? $_POST['numero_fmt_jugador_uno'] : "";
			$nombre_jugador_uno = isset($_POST['nombre_jugador_uno']) ? $_POST['nombre_jugador_uno'] : '';
			$numero_nl_jugador_dos = isset($_POST['numero_nl_jugador_dos']) ? $_POST['numero_nl_jugador_dos'] : 0;
			$numero_fmt_jugador_dos = isset($_POST['numero_fmt_jugador_dos']) ? $_POST['numero_fmt_jugador_dos'] : "";
			$nombre_jugador_dos = isset($_POST['nombre_jugador_dos']) ? $_POST['nombre_jugador_dos'] : '';
			$numero_nl_acompanante_uno = isset($_POST['numero_nl_acompanante_uno']) ? $_POST['numero_nl_acompanante_uno'] : 0;
			$numero_fmt_acompanante_uno = isset($_POST['numero_fmt_acompanante_uno']) ? $_POST['numero_fmt_acompanante_uno'] : "";
			$nombre_acompanante_uno = isset($_POST['nombre_acompanante_uno']) ? $_POST['nombre_acompanante_uno'] : "";
			$numero_nl_acompanante_dos = isset($_POST['numero_nl_acompanante_dos']) ? $_POST['numero_nl_acompanante_dos'] : 0;
			$numero_fmt_acompanante_dos = isset($_POST['numero_fmt_acompanante_dos']) ? $_POST['numero_fmt_acompanante_dos'] : "";
			$nombre_acompanante_dos = isset($_POST['nombre_acompanante_dos']) ? $_POST['nombre_acompanante_dos'] : "";
			$usuario = isset($_POST['usuario']) ? $_POST['usuario'] : "";
			$fecha_hora = isset($_POST['fecha_hora']) ? $_POST['fecha_hora'] : "";
			$modalidad = isset($_POST['modalidad']) ? $_POST['modalidad'] : 0;
			$rama = isset($_POST['rama']) ? $_POST['rama'] : 0;

			$fecha_nuevo_formato = new DateTime($fecha_hora);

            include './db/conectar.php';

			$sql = "{call GS_GuardarPartido(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
			$params = array($id_evento, $cancha, $numero_nl_jugador_uno, 
			$numero_fmt_jugador_uno, $numero_nl_acompanante_uno, 
			$numero_fmt_acompanante_uno, $numero_nl_jugador_dos, 
			$numero_fmt_jugador_dos, $numero_nl_acompanante_dos, $numero_fmt_acompanante_dos, 
			0, 0, 0, 0, 0, 0, $fecha_nuevo_formato->format('Y-m-d H:i:s'), 
			$modalidad, $rama, utf8_encode($usuario));
			// var_dump($params);
			// die();

			$stmt = sqlsrv_query($conn, $sql, $params);

			if ($stmt === false ) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}

            if ($validar){
                $data = array(
                    "estatus" => "success",
                    "mensaje" => "El jugador fue agregado exitosamente"
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay registros"
                );		
            }
            ob_clean();//clears the output buffer
            echo json_encode($data);
            sqlsrv_free_stmt($stmt);	

        break;
		case '14':
			$data = array();
			$validar = true;
            $query = array();

			$numero_nl = isset($_POST['numero_nl']) ? $_POST['numero_nl'] : 0;

            include './db/conectar.php';
			if ($numero_nl != 0) {
				$sql = "{call GS_ObtenerJugador(?)}";
				$params = array($numero_nl);
				$stmt = sqlsrv_query($conn, $sql, $params);
				if ($stmt === false ) {
					$validar = false;
					$mensaje = sqlsrv_errors();
					$data = array(
						"estatus" => 'error_consulta',
						"Validar" => $validar,
						"mensaje" => $mensaje[0]['message']
					);
					echo json_encode($data);
					die();
				}	
				while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
					$record = array(
						"NoNL" => $row['NoNL'],
						"NoFMT" => $row['NoFMT'],
						"Categoria" => $row['Categoria'],
						"Nombre" => utf8_encode($row['Nombre']),
						"ApPaterno" => utf8_encode($row['ApPaterno']),
						"ApMaterno" => utf8_encode($row['ApMaterno']),
						"Club" => utf8_encode($row['Club']),
						"Rama" => $row['Rama'],
						"Img" => utf8_encode($row['Img']),
						"Nombre_Completo" => utf8_encode($row['NombreCompleto']),
						"Nombre_Categoria" => utf8_encode($row['NombreCategoria']),
						"Img" => utf8_encode($row['Img']),
						"ImgQR" => utf8_encode($row['ImgQR'])
					);
					array_push($query, $record);
				}
			}

            if (count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay registros"
                );		
            }
            ob_clean();//clears the output buffer
            echo json_encode($data);
            sqlsrv_free_stmt($stmt);	
		break;
		case '15': //Consulta
            $data = array();
			$validar = true;
            $query = array();

            include './db/conectar.php';
            $sql = "{call GS_ObtenerModalidad()}";
            $stmt = sqlsrv_query($conn, $sql);
            if ($stmt === false ) {
                $validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
            }	
            while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
                $record = array(
                    "id_modalidad" => $row['IdModalildad'],
                    "nombre_modalidad" => $row['Nombre']
                );
                array_push($query, $record);
            }
            if (count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay registros"
                );		
            }
            ob_clean();//clears the output buffer
            echo json_encode($data);
            sqlsrv_free_stmt($stmt);	

        break;
		case '16': //Consulta
            $data = array();
            $evento = isset($_POST['evento']) && $_POST['evento'] != null ? $_POST['evento'] : null;
			$cancha = isset($_POST['cancha']) && $_POST['cancha'] != null ? $_POST['cancha'] : null;
			$modalidad = isset($_POST['modalidad']) && $_POST['modalidad'] != null ? $_POST['modalidad'] : null;
			$jugador = isset($_POST['jugador']) && $_POST['jugador'] != null ? $_POST['jugador'] : null;
			$validar = true;
            $query = array();

            include './db/conectar.php';

            $sql = "{call GS_ObtenerPartidoFiltros(?, ?, ?, ?)}";
			$params = array($cancha, $modalidad, $jugador, $evento);
            $stmt = sqlsrv_query($conn, $sql, $params);
            if ($stmt === false ) {
                $validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
            }	
            while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
                $record = array(
                    "id_juego" => $row['idJuego'],
					"id_evento" => $row['idEvento'],
					"nombre_evento" => utf8_encode($row['NombreEvento']),
                    "id_cancha" => $row['idCancha'],
					"cancha" => $row['Cancha'],
                    "no_juegador_uno" => $row['NoNLJugador1'],
                    "no_fmt_jugador_uno" => $row['NoFMTJugador1'],
					"nombre_jugador_uno" => utf8_encode($row['NombreJugador1']),
                    "no_nl_pareja_uno" => $row['NoNLAcompanante1'],
					"no_fmt_pareja_uno" => $row['NoFMTAcompanante1'],
                    "nombre_jugador_uno_pareja" => utf8_encode($row['NombreJugador1Acompanante']),
					"no_nl_jugador_dos" => $row['NoNLJugador2'],
                    "no_fmt_jugador_dos" => $row['NoFMTJugador2'],
                    "nombre_jugador_dos" => utf8_encode($row['NombreJugador2']),
					"no_nl_pareja_dos" => $row['NoNLAcompanante2'],
                    "no_fmta_pareja_dos" => $row['NoFMTAcompanante2'],
                    "nombre_jugador_dos_pareja" => utf8_encode($row['NombreJugador2Acompanante']),
					"resultado_set_uno_jugador_uno" => $row['ResultadoSet1Jugador1'],
                    "resultado_set_uno_jugador_dos" => $row['ResultadoSet1Jugador2'],
                    "resultado_set_dos_jugador_uno" => $row['ResultadoSet2Jugador1'],
					"resultado_set_dos_jugador_dos" => $row['ResultadoSet2Jugador2'],
                    "resultado_set_tres_jugador_uno" => $row['ResultadoSet3Jugador1'],
                    "resultado_set_tres_jugador_dos" => $row['ResultadoSet3Jugador2'],
					"no_nl_acompanante_uno" => $row['NoNLAcompanante1'],
                    "no_fmt_acompanante_uno" => $row['NoFMTAcompanante1'],
                    "nombre_acompanante_uno" => utf8_encode($row['NombreJugador1Acompanante']),
					"no_nl_acompanante_dos" => $row['NoNLJugador2'],
                    "no_fmt_acompanante_dos" => $row['NoFMTJugador2'],
                    "nombre_acompanante_dos" => utf8_encode($row['NombreJugador2Acompanante']),
					"fecha_hora_partido" => $row['FechaHoraPartido']->format('d/m/Y  h:i A'),
					"id_modalidad" => $row['Id_Modalidad'],
                    "nombre_modalidad" => utf8_encode($row['Nombre_Modalidad']),
                    "nombre_rama" => utf8_encode($row['Nombre_Rama'])
                );
                array_push($query, $record);
            }
            if (count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay registros"
                );		
            }
            ob_clean();//clears the output buffer
            echo json_encode($data);
            sqlsrv_free_stmt($stmt);	

        break;
		case '17':
			$data = array();
			$validar = true;
			$query = array();

			include './db/conectar.php';
			$sql = "{call [GS_TraerJugadoresSinQr]()}";
			$stmt = sqlsrv_query($conn, $sql);
			if ($stmt === false ) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}	
			while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
				$record = array(
					"NoNL" => $row['NoNL'],
					"NoFMT" => $row['NoFMT'],
					"Nombre_Completo" => utf8_encode($row['NombreCompleto']),
					"Nombre_Categoria" => utf8_encode($row['NombreCategoria']),
					"ImgQR" => utf8_encode($row['ImgQR'])
				);
				array_push($query, $record);
			}

			if (count($query) != 0){
				$data = array(
					"estatus" => "success",
					"data" => $query
				);
			}else{
				$data = array(
					"estatus" => 'error',
					"mensaje" => "no hay qr que crear"
				);		
			}
			ob_clean();//clears the output buffer
			echo json_encode($data);
			sqlsrv_free_stmt($stmt);	
		break;
		case '18':
			$data = array();
			$validar = true;
			$query = array();

			$evento = isset($_POST['evento']) ? $_POST['evento'] : "";
			$usuario = isset($_POST['usuario']) ? $_POST['usuario'] : "";
			$fecha_hora = isset($_POST['fecha_evento']) ? $_POST['fecha_evento'] : "";

			$fecha_nuevo_formato = new DateTime($fecha_hora);

			include './db/conectar.php';
			$sql = "{call GS_GuardarEventos(?, ?, ?)}";
			$params = array($evento, $fecha_nuevo_formato->format('Y-m-d H:i:s'), utf8_encode($usuario));
			$stmt = sqlsrv_query($conn, $sql, $params);

			if ($stmt === false ) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}

            if ($validar){
                $data = array(
                    "estatus" => "success",
                    "mensaje" => "El evento fue agregado exitosamente"
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "ocurrio un error"
                );		
            }
			ob_clean();//clears the output buffer
			echo json_encode($data);
			sqlsrv_free_stmt($stmt);	
		break;
		case '19': //Consulta
            $data = array();
			$validar = true;
            $query = array();

			$datos = isset($_POST['datos']) && is_array($_POST['datos']) ? $_POST['datos'] : 0;

			include './db/conectar.php';

			foreach ($datos as $jugador) {
				$numero_fmt = isset($jugador['NoFMT']) ? $jugador['NoFMT'] : '';
				$imgqr = isset($jugador['ImgQR']) ? $jugador['ImgQR'] : '';
				
				$sql = "{call GS_EditarQR(?, ?)}";
				$params = array($numero_fmt, $imgqr);
				$stmt = sqlsrv_query($conn, $sql, $params);
				if ($stmt === false ) {
					$validar = false;
					$mensaje = sqlsrv_errors();
					$data = array(
						"estatus" => 'error_consulta',
						"Validar" => $validar,
						"mensaje" => $mensaje[0]['message']
					);
					echo json_encode($data);
					die();
				}
			}

			if ($validar){
				$data = array(
					"estatus" => "success",
					"mensaje" => "se crearon todos los qr"
				);
			}else{
				$data = array(
					"estatus" => 'error',
					"mensaje" => "no hay registros"
				);		
			}
			ob_clean();//clears the output buffer
			echo json_encode($data);
			sqlsrv_free_stmt($stmt);
		break;
		case '20':
			$data = array();
			$validar = true;
            $query = array();

            include './db/conectar.php';
            $sql = "{call GS_ObtenerRamas()}";
            $stmt = sqlsrv_query($conn, $sql);
            if ($stmt === false ) {
                $validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
            }	
            while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
                $record = array(
                    "id_rama" => $row['IdRama'],
                    "nombre_rama" => $row['Nombre']
                );
                array_push($query, $record);
            }
            if (count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay registros"
                );		
            }
            ob_clean();//clears the output buffer
            echo json_encode($data);
            sqlsrv_free_stmt($stmt);	
		break;
		case '21':
			$data = array();
			$validar = true;
            $query = array();

			$no_fmt = isset($_POST['no_fmt']) ? $_POST['no_fmt'] : '';

            include './db/conectar.php';
			if ($no_fmt != '') {
				$sql = "{call GS_ObtenerJugadorFMT(?)}";
				$params = array($no_fmt);
				$stmt = sqlsrv_query($conn, $sql, $params);
				if ($stmt === false ) {
					$validar = false;
					$mensaje = sqlsrv_errors();
					$data = array(
						"estatus" => 'error_consulta',
						"Validar" => $validar,
						"mensaje" => $mensaje[0]['message']
					);
					echo json_encode($data);
					die();
				}	
				while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
					$record = array(
						"NoNL" => $row['NoNL'],
						"NoFMT" => $row['NoFMT'],
						"Categoria" => $row['Categoria'],
						"Nombre" => utf8_encode($row['Nombre']),
						"ApPaterno" => utf8_encode($row['ApPaterno']),
						"ApMaterno" => utf8_encode($row['ApMaterno']),
						"Club" => utf8_encode($row['Club']),
						"Rama" => $row['Rama'],
						"Img" => utf8_encode($row['Img']),
						"Nombre_Completo" => utf8_encode($row['NombreCompleto']),
						"Nombre_Categoria" => utf8_encode($row['NombreCategoria'])
					);
					array_push($query, $record);
				}
			}

            if (count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "Número de federación no encontrado"
                );		
            }
            ob_clean();//clears the output buffer
            echo json_encode($data);
            sqlsrv_free_stmt($stmt);	
		break;
		case '22': //Consulta
            $data = array();
			$validar = true;
            $query = array();

			// $numero_nl = isset($_POST['numero_nl']) ? $_POST['numero_nl'] : '';
			// $numero_fmt = isset($_POST['numero_fmt']) ? $_POST['numero_fmt'] : '';
			$categoria = isset($_POST['categoria']) ? utf8_decode($_POST['categoria']) : '';
			$nombre_jugador = isset($_POST['nombre_jugador']) ? utf8_decode($_POST['nombre_jugador']) : '';
			$club = isset($_POST['club']) ? utf8_decode($_POST['club']) : '';
			$partners = isset($_POST['partners']) ? $_POST['partners'] : 0;
			$limite_peticiones = isset($_POST['limite_peticiones']) ? $_POST['limite_peticiones'] : 1;

            include './db/conectar.php';
			if ($limite_peticiones > 0) {
				$data = array(
					"estatus" => 'peticiones_excesivas',
					"mensaje" => 'No puedes hacer mas peticiones hasta pasado un tiempo'
				);
				echo json_encode($data);
				die();
			}
			$sql = "{call GS_ReservarInvitacion(?, ?, ?, ?)}";
			$params = array(
				// $numero_fmt, (int)$numero_nl, 
				$nombre_jugador, $categoria, $club, $partners);
			// var_dump($params);
			// die();
			$stmt = sqlsrv_query($conn, $sql, $params);

			if ($stmt === false ) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}
			
			while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
				$record = array(
					"Respuestas" => $row['Resultado'],
					"Duplicados" => $row['Duplicado']
				);
				array_push($query, $record);
			}

            if ($validar){
                $data = array(
                    "estatus" => "success",
                    "mensaje" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => $query
                );		
            }
            ob_clean();//clears the output buffer
            echo json_encode($data);
            sqlsrv_free_stmt($stmt);	

        break;
		case '23': //Consulta
            $data = array();
			$validar = true;
            $query = array();

            include './db/conectar.php';
            $sql = "{call GS_ObtenerPremiacion()}";
            $stmt = sqlsrv_query($conn, $sql);
            if ($stmt === false ) {
                $validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
            }	
            while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
                $record = array(
					"NoFMT" => $row['NoFMT'],
                    "NoNL" => $row['NoNL'],
					"Nombre" => utf8_encode($row['Nombre']),
					"Categoria" => $row['Categoria'],
					"ClubDeportivo" => utf8_encode($row['ClubDeportivo']),
					"Acompanante" => $row['Acompanante']
                );
                array_push($query, $record);
            }

            if (count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay registros"
                );		
            }
            ob_clean();//clears the output buffer
            echo json_encode($data);
            sqlsrv_free_stmt($stmt);	

        break;
  	}
?>