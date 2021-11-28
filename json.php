
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">    
    <title>Document</title>
    
</head>
<body>
    
    <pre style="word-wrap: break-word; white-space: pre-wrap;" id="mensajes"></pre>
    <!-- convertir a json y mostrar el $mensajes -->
    
</body>
<script>
          //crea un objeto json de mensajes
            var info = {
                "mensajes": [
                {
                    "id": 1,
                    "nombre": "Juan",
                    "mensaje": "Hola mundo"
                },
                {
                    "id": 2,
                    "nombre": "Pedro",
                    "mensaje": "Hola mundo"
                },
                {
                    "id": 3,
                    "nombre": "Luis",
                    "mensaje": "Hola mundo"
                }
                ]
            };
    
    
    
        const mensajes = JSON.stringify(info);
       
    //mostrar mensajes en el pre
        document.getElementById('mensajes').innerHTML = mensajes;
        console.log(mensajes);
    
    </script>
</html>
