const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const fs = require('fs');
const content = 'Contenido del archivo de text';

app.get('/', (req, res) => {
   
      //el archivo persiste entre requests
    fs.writeFile('/home/joe/test.txt', content, err => {
      if (err) {
        res.send('ERROR AL ESCRIBIR EL ARCHIVO! '+ err);
        //console.error(err);
      }
      // file written successfully
      //res.send('Hola Mundo Success!');
      fs.readFile('test.txt', 'utf8', function(err, data){ 
        // Display the file content 
        res.send(data);
    }); 

    });



   // res.send('Hola Mundo Final!');
    
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
