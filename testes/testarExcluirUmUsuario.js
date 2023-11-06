
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

// caso de teste
const exec = async () => {
    const usuario = {
        "nome": "Gyro Zepelli",
        "email": "gyro@univas.edu.br",
        "senha": "univas",
        "login": "gyroZ"
    }
    
    const url = "http://localhost:3124/usuarios"
    
    console.log("Teste de exclusão de usuário - INÍCIO")
    const cadastrado = await cadastroDeUsuarioTeste(url, usuario);
    try{
        //
        const responsePreDelete = await axios.get(url)
        const dadosPreDelete = responsePreDelete.data
        
        const response = await axios.delete(`${url}/${cadastrado.id}`)
        
        const {status} = response
        
        //
        const responsePostDelete = await axios.get(url)
        const dadosPostDelete = responsePostDelete.data
        
        //Compara status e objetos
        if(status == 200 && dadosPreDelete.length > dadosPostDelete.length){
            console.log(`Teste executado com SUCESSO. ID ${cadastrado.id}`)
        }else{
            console.log("Falha ao executar teste")
        }
    }catch(err){
        console.log(err)
        console.log("Teste executado com FALHA")
    }

    console.log("Teste de exclusão de usuário - FIM")
}

module.exports = exec