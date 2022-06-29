//Class
const Contenedor = require('./contenedor')
//Config
const config = require('./options/DB')
const configSqlite = require('./options/DBsqlite')

//Instance
const contenido = new Contenedor(config)
const chat = new Contenedor(configSqlite)
const usernames = new Contenedor(configSqlite)


module.exports = (io) => {

    io.on('connection', async (socket) => {
        //Productos
        socket.emit('productos' , await contenido.getAll())

        //Chat
        socket.on('enviando:mensaje' , async (mensaje , usuario) => {
            const obj = {
                mensaje: mensaje,
                usuario: usuario
            }
            await chat.saveChat(obj)
            io.sockets.emit('mensaje' , await chat.getChat())
        })

        socket.on('user:name' , async data => {
            await usernames.saveUser(data)
            io.sockets.emit('all-user' , await usernames.getUser() )
          })

        
    })


    
}