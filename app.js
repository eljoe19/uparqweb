const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const fs = require('fs');
const pathArchivoTXT = 'dbObjetos2.txt';

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
      return res.send("OK - ValorRes: " + valorRes);
    }else{
      res.status(400);
      return res.send("No se pudo guardar el nuevo objeto. ValorRes: " + valorRes);
    };
 }
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

app.get('/objetos',(req,res)=>{
  /***** OBTENGO UN LISTADO DE OBJETOS DEL SISTEMA ******/
  fs.readFile(pathArchivoTXT, 'utf8', function(err, data){ 
    // Display the file content 
    var myarray = data.split('\r\n');
    var html='';
    for(var i = 0; i < myarray.length; i++)
      {
       html=html + myarray[i] + '<br>';
      }
      res.status(200);
      res.send(html);
  });
});

app.delete('/objetos/:id',(req,res)=>{
  /***** BORRO UN OBJETO DEL LISTADO DE OBJETOS DEL SISTEMA ******/
  res.status(200);
  res.send("pendiente implementar borrado de objeto");
});

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
