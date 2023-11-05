Proyecto de cursada Arquitectura Web

Este sistema se encarga de administrar las reservas de elementos para fiestas.
Su stock se compone de cosas que pueden ser alquiladas como mesas, sillas, cotillon y distintos tipos de juegos.
La entidad principal será "Objetos" que representa cada una de las cosas que podran ser alquiladas.

El sistema permitirá agregar, modificar, eliminar o leer los objetos para ser alquilados.
El sistema permitirá marcar un objeto como alquilado.
El sistema podrá generar un reporte de stock indicando el estado de cada cosa (si esta alquilado o no).

**API ENDPOINTS**  
**---- CRUD de objetos para ser alquilados ---**  
Crear nuevo objeto: POST /objetos?codigo=xxx&nombre+xxx&desc=xxx&categoria=xxx  
Actualizar objeto: PUT /objetos/id_objeto?nombre=xxx&desc=xxx&categoria=xxx 
Borrar un objeto: DELETE /objetos/id_objeto  
Obtener un objeto: GET /objetos/id_objeto   
Obtener todos los objetos: GET /objetos   
Obtener todos los objetos de una categoria: GET /objetos/categorias/xxxxx

**---- Gestionar Alquiler/Devolucion ----**  
Alquilar un objeto: POST /alquileres/objetos/id_objeto?idclie=xxx&desde=yyyymmdd&hasta=yyyymmdd  
Obtener listado de objetos alquilados: GET /alquileres    
Obtener listado de objetos alquilados de un cliente GET /alquileres/clientes/id_cliente

