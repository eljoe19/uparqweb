const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hola Mundo!');

    fs.writeFile('test.txt', content, err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
    
  });

app.get('/bienvenido', (req, res) => {
  res.send('Bienvenido!');
});

app.get('/alumno', (req, res) => {
    res.send('Soy un alumno');
  });

app.listen(port, () => {
  console.log(`El servidor se encuentra corriendo en el puerto ${port}`);
});
