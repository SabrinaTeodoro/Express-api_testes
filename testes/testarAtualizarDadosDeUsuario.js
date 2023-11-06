const axios = require("axios")

function updatePropertiesUsuario(oldProps, newProps){
    oldProps.nome = newProps.nome;
    oldProps.login = newProps.login;
    oldProps.email = newProps.email;
    oldProps.senha = newProps.senha;
    //console.log(oldProps);
    return oldProps;
}
async function cadastroDeUsuarioTeste(url, usuario) {
    try {
        const response = await axios.post(url, usuario);
        const {data} = response
        if(data && data.id){
            const cadastrado = {...data}
            // delete cadastrado.senha
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
    const novoUsuario = {
        "nome": "Johny Joestar",
        "email": "johny@univas.edu.br",
        "senha": "univas",
        "login": "Jojo"
    }
    
    const url = "http://localhost:3124/usuarios"
    
    console.log("Teste de atualização dos dados do usuário - INÍCIO")
    const cadastrado = await cadastroDeUsuarioTeste(url, usuario);
    try{
        const cadastradoAtualizado = updatePropertiesUsuario({...cadastrado}, novoUsuario);
        
        const response = await axios.put(`${url}/${cadastradoAtualizado.id}`, cadastradoAtualizado)
        
        const {status, data} = response
        
        //
        const responsePostEdit = await axios.get(`${url}/${data.id}`)
        const dadosPostEdit = responsePostEdit.data
        
        //Compara status e objetos
        if(status == 200 && data && !comparaUsuario(cadastrado, dadosPostEdit)){
            console.log(`Teste executado com SUCESSO. ID ${data.id}`)
        }else{
            console.log("Falha ao executar teste")
        }
    }catch(err){
        console.log(err)
        console.log("Teste executado com FALHA")
    }

    console.log("Teste de atualização dos dados do usuário - FIM")
}

module.exports = exec