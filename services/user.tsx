let users = [
    {
        email:"pry.vasconcelos@hotmail.com",
        password:"123"
    }
];

export function cadastro(body) {

    const user = users.find(({ email }) => email === body.email)
    
    if (user) throw new Error('Usuário já cadastrado')

    users.push(body)

    return body
}

export function login(usuario) {

    var result = {
        status: 200,
        message: "",
        token: ""
    };

    const user = users.find(({ email }) => email === usuario.email)

    if (!user) {
        result.status = 400;
        result.message = "Usuário não encontrado"
    } else

    if (user.password !== usuario.password) 
    {
        result.status = 400;
        result.message = "Usuário ou senha incorretos"
    }

    return result

}