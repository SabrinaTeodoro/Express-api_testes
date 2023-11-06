const testarCadastrarUsuario = require("./testarCadastrarUsuario.js")
const testarBuscarUmUsuario = require("./testarBuscarUmUsuario.js")
const testarExcluirUmUsuario = require("./testarExcluirUmUsuario.js")
const testarAtualizarDadosDeUsuario = require("./testarAtualizarDadosDeUsuario.js")



const mainTest = async() => {
    await testarCadastrarUsuario()
    await testarBuscarUmUsuario()
    await testarExcluirUmUsuario()
    await testarAtualizarDadosDeUsuario()
}
mainTest();