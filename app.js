const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const fs = require('fs');
const content = 'Contenido del archivo de text';

app.get('/', (req, res) => {
   
  res.status(201);
  //el archivo persiste entre requests
    fs.writeFile('test.txt', content, err => {
      if (err) {
        res.send('ERROR AL ESCRIBIR EL ARCHIVO! '+ err);
      }
      // file written successfully
      fs.readFile('test.txt', 'utf8', function(err, data){ 
          // Display the file content 
         res.send(data);
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
