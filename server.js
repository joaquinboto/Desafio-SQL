const express = require('express');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
require('./socket')(io)
const config = require('./options/DB')
const Contenedor = require('./contenedor')
const contenido = new Contenedor(config)
app.use(express.static('view'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/productos', async (req, res) => {
  const producto = req.body
  contenido.ifCreateTable()
  if (producto.nombre && producto.cantidad && producto.imagen) {
    contenido.save(producto)
    res.redirect('/')
  } else {
      res.status(400).send('Ingrese todos los campos')
  }
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

