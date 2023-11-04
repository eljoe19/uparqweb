const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const fs = require('fs');
const pathArchivoTXT = 'dbObjetos.txt';


app.post('/objetos',(req,res)=>{
  
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
  return true;
  //nuevoObj= codigo + ',' + nombre + ',' + desc + ',' + categoria;
  //fs.writeFileSync(pathArchivoTXT, nuevoObj);
};


app.get('/objetos',(req,res)=>{
// file written successfully
      fs.readFile(pathArchivoTXT, 'utf8', function(err, data){ 
          // Display the file content 
          res.status(200);
          res.send(data);
      });
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
