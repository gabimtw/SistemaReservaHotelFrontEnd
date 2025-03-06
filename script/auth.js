// auth.js

// Função para realizar o cadastro
function cadastrarUsuario(nome, email, senha) {
    // Aqui seria feito o envio ao backend para criar o novo usuário.
    // Simulando sucesso:
    localStorage.setItem('usuario', JSON.stringify({ nome, email, senha }));
    alert('Cadastro bem-sucedido!');
    window.location.href = 'login.html';
}

// Função para fazer o login
function loginUsuario(email, senha) {
    // Verificando se o usuário está cadastrado (simulado com o localStorage)
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario && usuario.email === email && usuario.senha === senha) {
        alert('Login bem-sucedido!');
        window.location.href = 'dashboard.html'; // Redireciona para o dashboard
    } else {
        alert('E-mail ou senha incorretos!');
    }
}

// Cadastro (do cadastro.html)
document.getElementById('cadastroForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    cadastrarUsuario(nome, email, senha);
});

// Login (do login.html)
document.getElementById('loginForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    loginUsuario(email, senha);
});
