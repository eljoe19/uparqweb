const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const fs = require('fs');
const pathArchivoTXT = 'dbObjetos2.txt';
const pathArchivoTXTReservas='dbReservas.txt';


/***************************************/
/********* CRUD DE OBJETOS *************/
/**************************************/

app.post('/objetos',(req,res)=>{
  /***** AGREGO UN OBJETO AL SISTEMA ******/

  //verifico que existan parametros
  if(!req.query || !req.query.codigo || !req.query.nombre || !req.query.desc || !req.query.categoria ){
        res.status(400);
        return res.send("Debe pasar los parametros CODIGO, NOMBRE, DESC y CATEGORIA");
  }else{
    //guardo nuevo objeto en txt
    var valorRes=guardarNuevoObjeto(req.query.codigo,req.query.nombre,req.query.desc,req.query.categoria);
    if(valorRes){
      res.status(200);
      return res.send("Objeto agregado.");
    }else{
      res.status(400);
      return res.send("No se pudo guardar el nuevo objeto");
    };
 }
});

app.get('/objetos',(req,res)=>{
  /***** OBTENGO TODOS LOS OBJETOS DEL SISTEMA ******/
  var arrObjetos=obtenerArrayObjetos(pathArchivoTXT);
  var html='<html>';
  var resJson = {} // empty Object
  var key = 'Objetos para Alquilar';
  resJson[key] = []; // empty Array, which you can push() values into

  for(var i = 0; i < arrObjetos.length; i++)
    {
      //para json
      var tmpJson=arrObjetos[i].split(',');
      var resDataJson={Codigo:tmpJson[0],Producto:tmpJson[1]};
      resJson[key].push(resDataJson);
      //para html
      html=html + arrObjetos[i] + '<br>';
    }
  html=html+'</html>';

  //VERIFICO REQUEST PARA RESPONDER EN JSON O HTML
  if (req.is('application/json')){
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(resJson);
  }else{
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }  

});

app.get('/objetos/:id',(req,res)=>{
  /***** OBTENGO UN SOLO OBJETO DEL LISTADO DE OBJETOS DEL SISTEMA ******/
  res.status(200);
  res.send("pendiente implementar mostrar un solo objeto con ID: " + req.params.id + ' data: ' + obtenerArrayObjetos());
});

app.delete('/objetos/:id',(req,res)=>{
  /***** BORRO UN OBJETO DEL LISTADO DE OBJETOS DEL SISTEMA ******/
  res.status(200);
  res.send("pendiente implementar borrado de objeto con ID: " + req.params.id + ' data: ' + obtenerArrayObjetos());
});

app.put('/objetos/:id',(req,res)=>{
  /***** ACTUALIZO UN OBJETO DEL LISTADO DE OBJETOS DEL SISTEMA ******/
  res.status(200);
  res.send("pendiente implementar actualizacion de un objeto con ID: " + req.params.id + ' data: ' + obtenerArrayObjetos());
});

function guardarNuevoObjeto(codigo,nombre,desc,categoria){
  //agrego objetos linea a linea en el txt  
  nuevoObj= codigo + ',' + nombre + ',' + desc + ',' + categoria + '\r\n';
  try{
    fs.appendFileSync(pathArchivoTXT, nuevoObj);
    return true;
  }catch(e){
    return false;
  }
};
function obtenerArrayObjetos(pathDB)
{
  try{
    data = fs.readFileSync(pathDB,{ encoding: 'utf8', flag: 'r' });
    var myarray = data.split('\r\n');
    return myarray;
  }catch(e){
    return false;
  }
}

/***************************************/
/********* ALQUILERES DE OBJETOS *************/
/**************************************/
app.post('/alquileres/objetos/:id',(req,res)=>{
  /***** REGISTRO EL ALQUILER DE UN OBJETO DEL SISTEMA ******/
  //verifico que existan parametros
  if(!req.query || !req.query.desde || !req.query.hasta || !req.query.idclie){
        res.status(400);
        return res.send("Debe pasar los parametros DESDE, HASTA, IDCLIE");
  }else{

    //verifico que objeto exista

    //guardo nueva reserva en db
    var valorRes=guardarNuevaReserva(req.params.id,req.query.idclie,req.query.desde,req.query.hasta);
    if(valorRes){
      res.status(200);
      return res.send("Reserva realizada.");
    }else{
      res.status(400);
      return res.send("No se pudo realizar la reserva");
    };
 }
});

app.get('/alquileres',(req,res)=>{
 /***** OBTENGO TODOS LOS ALQUILERES ******/
 var arrAlquileres=obtenerArrayObjetos(pathArchivoTXTReservas);
 var html='';
 for(var i = 0; i < arrAlquileres.length; i++)
   {
     html=html + arrAlquileres[i] + '<br>';
   }
   res.status(200);
   res.send(html);
});

app.get('/alquileres/clientes/:idclie',(req,res)=>{
  /***** OBTENGO TODOS LOS ALQUILERES DE UN CLIENTE ******/
  var arrAlquileres=obtenerArrayObjetos(pathArchivoTXTReservas);
  var html='';
  for(var i = 0; i < arrAlquileres.length; i++)
    {
      //verifico si la reserva es del cliente
      let tmp=arrAlquileres[i].split(',');
      if(tmp[1] === req.params.idclie)
      {
        html=html + arrAlquileres[i] + '<br>';
      }
    }
    res.status(200);
    res.send(html);
 });


function guardarNuevaReserva(codigoProd,idClie,desde,hasta){
  //agrego objetos linea a linea en el txt  
  nuevoObj= codigoProd + ',' + idClie + ',' + desde + ',' + hasta + '\r\n';
  try{
    fs.appendFileSync(pathArchivoTXTReservas, nuevoObj);
    return true;
  }catch(e){
    return false;
  }
};



app.get('/', (req, res) => {
   
  });

app.get('/bienvenido', (req, res) => {
  //res.send('Bienvenido!');
  fs.readFile('test.txt', 'utf8', function(err, data){ 
    // Display the file content 
    res.send(data);
}); 


});

app.get('/alumno', (req, res) => {
    res.send('Soy un alumno');
  });

app.listen(port, () => {
  console.log(`El servidor se encuentra corriendo en el puerto ${port}`);
});
