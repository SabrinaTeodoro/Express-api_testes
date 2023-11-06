/* 
--- ROTEIRO ---
1 - Buscar todos os usuarios cadastrados
2 - Cadastrar um usuario (Caso nao haja cadastrados, cadastro um)
    3 - Buscar pelo que cadastrei
4 - Comparar a 1° busca com a 2°
*/
const axios = require("axios")

async function cadastroDeUsuarioTeste(url, usuario) {
    try {
        const response = await axios.post(url, usuario);
        const {data} = response
        if(data && data.id){
            const cadastrado = {...data}
            delete cadastrado.senha
            return cadastrado
        }
    } catch (error) {
        console.log("Erro ao cadastrar usuario teste");
    }
}
function comparaUsuario(u1, u2){
    return u1.nome === u2.nome && u1.email === u2.email && u1.login === u2.login && u1.id === u2.id
}
// caso de teste
const exec = async () => {
    const usuario = {
        "nome": "Gyro Zepelli",
        "email": "gyro@univas.edu.br",
        "senha": "univas",
        "login": "gyroZ"
    }
    
    const url = "http://localhost:3124/usuarios"
    
    console.log("Teste de busca de usuário - INÍCIO")
    const cadastrado = await cadastroDeUsuarioTeste(url, usuario);

    try{
        //
        const response = await axios.get(`${url}/${cadastrado.id}`)
        
        const {status, data} = response
        //Coleta resposta
        const dados2 = response.data
        
        //Compara status e objetos
        if(status == 200 && data && comparaUsuario(cadastrado, dados2)){
            console.log(`Teste executado com SUCESSO. ID ${data.id}`)
        }else{
            console.log("Falha ao executar teste")
        }
    }catch(err){
        console.log(err)
        console.log("Teste executado com FALHA")
    }

    console.log("Teste de busca de usuário - FIM")
}

module.exports = exec