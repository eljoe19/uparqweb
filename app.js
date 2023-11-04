const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const fs = require('fs');
const content = 'Contenido del archivo de texto.';


app.post('/objetos',(req,res)=>{
  
  //verifico que existan parametros
  if(!req.query || !req.query.codigo || !req.query.nombre || !req.query.desc || !req.query.categoria ){
        res.status(400);
        return res.send("Debe pasar los parametros CODIGO, NOMBRE, DESC y CATEGORIA");
  }else{
    //guardo nuevo objeto en txt
    valorRes=guardarNuevoObjeto(req.query.codigo,req.query.nombre,req.query.desc,req.query.categoria);
    if(valorRes==true){
      res.status(200);
      return res.send("Nombre: " + valorRes);
    }else{
      res.status(400);
      return res.send("No se pudo guardar el nuevo objeto.");
    };
    
  }
});

function guardarNuevoObjeto(codigo,nombre,desc,categoria){
  
  nuevoObj= codigo + ',' + nombre + ',' + desc + ',' + categoria;
  fs.writeFile('test.txt', nuevoObj, err => {
    if (err) {
      //res.send('ERROR AL ESCRIBIR EL ARCHIVO! '+ err);
      return false;
    }
    // file written successfully
      return true; 
  });
};


app.get('/objetos',(req,res)=>{
// file written successfully
      fs.readFile('test.txt', 'utf8', function(err, data){ 
          // Display the file content 
          res.status(200);
          res.send(data);
      });
});

app.get('/', (req, res) => {
   
    //el archivo persiste entre requests
    fs.writeFile('test.txt', content, err => {
      if (err) {
        res.send('ERROR AL ESCRIBIR EL ARCHIVO! '+ err);
      }
      // file written successfully
      fs.readFile('test.txt', 'utf8', function(err, data){ 
          // Display the file content 
          res.status(200);
          res.send(data + ' ' + req.method);
      }); 
    });
    
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
