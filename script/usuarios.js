// Usuarios.js

const baseUrl = 'http://localhost:3000/usuarios'; // API para gerenciar usuários

// Função para listar usuários
function listarUsuarios() {
    fetch(baseUrl)
        .then(response => response.json())
        .then(usuarios => {
            const listaUsuarios = document.getElementById('listaUsuarios');
            listaUsuarios.innerHTML = '';
            usuarios.forEach(usuario => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${usuario.nome}</td>
                    <td>${usuario.email}</td>
                    <td>
                        <button onclick="editarUsuario(${usuario.id})">Editar</button>
                        <button onclick="excluirUsuario(${usuario.id})">Excluir</button>
                    </td>
                `;
                listaUsuarios.appendChild(tr);
            });
        });
}

// Função para adicionar usuário
function adicionarUsuario(event) {
    event.preventDefault();
    const nome = document.getElementById('nomeUsuario').value;
    const email = document.getElementById('emailUsuario').value;

    fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email })
    })
    .then(response => response.json())
    .then(() => {
        listarUsuarios(); // Atualiza a lista após adicionar
        document.getElementById('formUsuario').reset(); // Limpa o formulário
    });
}

// Função para editar usuário
function editarUsuario(id) {
    const nome = prompt('Novo nome do usuário:');
    const email = prompt('Novo email do usuário:');

    fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email })
    })
    .then(response => response.json())
    .then(() => {
        listarUsuarios(); // Atualiza a lista após editar
    });
}

// Função para excluir usuário
function excluirUsuario(id) {
    fetch(`${baseUrl}/${id}`, { method: 'DELETE' })
    .then(() => {
        listarUsuarios(); // Atualiza a lista após excluir
    });
}

// Chama a função para listar usuários quando o script é carregado
listarUsuarios();

// Adiciona evento ao formulário de adicionar usuário
document.getElementById('formUsuario').addEventListener('submit', adicionarUsuario);
