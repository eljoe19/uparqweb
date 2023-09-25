Proyecto de cursada Arquitectura Web

Este sistema se encarga de administrar las reservas de elementos para fiestas.
Su stock se compone de cosas que pueden ser alquiladas como mesas, sillas, cotillon y distintos tipos de juegos.
La entidad principal será "Objetos" que representa cada una de las cosas que podran ser alquiladas.

El sistema permitirá agregar, modificar, eliminar o leer los objetos para ser alquilados.
El sistema permitirá marcar un objeto como alquilado.
El sistema podrá generar un reporte de stock indicando el estado de cada cosa (si esta alquilado o no).

**API ENDPOINTS**  
**---- CRUD de objetos para ser alquilados ---**  
Crear nuevo objeto: POST /api/v1/objetos?nombre=xxx&descripcion=xxx&categoria=xxx  
Actualizar objeto: PUT /api/v1/objetos/id_objeto?nombre=xxx&descripcion=xxx&categoria=xxx  
Borrar un objeto: DELETE /api/v1/objetos/id_objeto  
Obtener un objeto: GET /api/v1/objetos/id_objeto  

**---- Gestionar Alquiler/Devolucion ----**  
Alquilar un objeto: POST /api/v1/alquileres/id_objeto?fecha_inicio=xxxx&fecha_fin=xxx  
Registrar devolucion: POST /api/v1/devoluciones/id_objeto?fecha_devolucion=xxxx

**---- Listado de Stock ----**  
Obtener todos los objetos: /api/v1/objetos
Obtener todos los objetos de una categoria:/api/v1/objetos?categoria=xxx

**---- Listado de Alquileres Activos ----**  
Obtener listado de objetos alquilados: GET /api/v1/alquileres

