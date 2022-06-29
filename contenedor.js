

class Contenedor {

    constructor(options) {
        this.knex = require('knex')(options)
    }

    async ifCreateTable() {
        const table = await this.knex.schema.hasTable('productos')
        if (!table) {
            await this.createTable()
        } else {
            console.log('La tabla ya existe')
        }
    }

    async createTable() {
            return this.knex.schema.createTable('productos', (table) => {
                table.increments('id')
                table.string('nombre')
                table.string('imagen')
                table.string('cantidad')
            })
    }

    async save(obj) {
        return await this.knex('productos').insert(obj)
    }

    async getAll() {
        const data = await this.knex.from('productos').select('*')
        return data
    }

    async saveChat(obj) {
        return await this.knex.from('chat').insert(obj)
    }

    async getChat() {
        const data = await this.knex.from('chat').select('*')
        return data
    }

    async getUser() {
        const data = await this.knex.from('usuariosConectados').select('*')
        return data
    }

    async saveUser(obj) {
        return await this.knex.from('usuariosConectados').insert(obj)
    }

 
}

module.exports = Contenedor;
