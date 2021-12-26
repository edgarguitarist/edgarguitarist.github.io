<?php

$Nombres = isset($_SESSION['username']) ? $_SESSION['username'] : '';

if(!isset($ssite)){
    $ssite = $site;
}

$mensajes = [
    'bienvenido' => [
        'header' => 'BIENVENIDO!!! 🤩',
        'message' => 'Es un gusto volver a verte ' . $Nombres. '!',
        'type' => 'INFO'
    ],
    'no_session' => [
        'header' => 'ADVERTENCIA!',
        'message' => 'Acceso no permitido, Primero debe iniciar sesión.',
        'type' => 'WARNING'
    ],
    'logout' => [
        'header' => '',
        'message' => 'SIGUE DISFRUTANDO DE NUESTROS SERVICIOS.',
        'type' => 'INFO'
    ],
    'error' => [
        'header' => 'ERROR',
        'message' => 'Lo sentimos, Algo no ha salido bien!',
        'type' => 'ERROR'
    ],
    'user_error' => [
        'header' => 'VUELVA A INTENTAR! 😀',
        'message' => 'Correo O Contraseña Incorrecta.',
        'type' => 'ERROR'
    ],
    'rol_error' => [
        'header' => 'LO SENTIMOS! ',
        'message' => 'Aún no puedes iniciar sesión.',
        'type' => 'ERROR'
    ],
    'delete' => [
        'header' => 'Datos Actualizados! ',
        'message' => 'Hemos Eliminado el ' . $ssite . '.',
        'type' => 'SUCCESS'
    ],
    'delete_error' => [
        'header' => 'LO SENTIMOS! ',
        'message' => 'No hemos podido Eliminar el ' . $ssite . '.',
        'type' => 'ERROR'
    ],
    'undelete' => [
        'header' => 'Datos Actualizados! ',
        'message' => 'Hemos Restaurado el ' . $ssite . '.',
        'type' => 'SUCCESS'
    ],
    'undelete_error' => [
        'header' => 'LO SENTIMOS! ',
        'message' => 'No hemos podido Restaurar el ' . $ssite . '.',
        'type' => 'ERROR'
    ],
    'upgrade' => [
        'header' => 'Datos Actualizados! ',
        'message' => 'Hemos Mejorado el Rank del ' . $ssite . '.',
        'type' => 'SUCCESS'
    ],
    'upgrade_error' => [
        'header' => 'LO SENTIMOS! ',
        'message' => 'No hemos podido Mejorar el Rank del ' . $ssite . '.',
        'type' => 'ERROR'
    ],
    'downgrade' => [
        'header' => 'Datos Actualizados! ',
        'message' => 'Hemos Cambiado el Rank del ' . $ssite . '.',
        'type' => 'SUCCESS'
    ],
    'downgrade_error' => [
        'header' => 'LO SENTIMOS! ',
        'message' => 'No hemos podido Cambiar el Rank del ' . $ssite . '.',
        'type' => 'ERROR'
    ]
];


//echo json_encode($mensajes);

if (isset($_GET["info"])) {
    $mensaje = $_GET["info"];
    $cabecera = $mensajes[$mensaje]['header'];
    $respuesta = $mensajes[$mensaje]['message'];   
?>
    <script>
        (function($) {
            $(document).ready(function() {
                $.jGrowl('<?php echo $respuesta ?>', {
                    header: '<?php echo $cabecera ?>'
                })
            });
        })(jQuery);
    </script>
<?php
}
?>