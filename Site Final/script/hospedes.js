// Hospedes.js

const baseUrl = 'http://localhost:3000/hospedes'; // API para gerenciar hóspedes

// Função para listar hóspedes
function listarHospedes() {
    fetch(baseUrl)
        .then(response => response.json())
        .then(hospedes => {
            const listaHospedes = document.getElementById('listaHospedes');
            listaHospedes.innerHTML = '';
            hospedes.forEach(hospede => {
                const li = document.createElement('li');
                li.textContent = `${hospede.nome} - ${hospede.email}`;
                listaHospedes.appendChild(li);
            });
        });
}

// Função para adicionar hóspede
function adicionarHospede(event) {
    event.preventDefault();
    const nome = document.getElementById('nomeHospede').value;
    const email = document.getElementById('emailHospede').value;

    fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email })
    })
    .then(response => response.json())
    .then(() => {
        listarHospedes(); // Atualiza a lista após adicionar
        document.getElementById('formHospede').reset(); // Limpa o formulário
    });
}

// Função para editar hóspede
function editarHospede(id) {
    const nome = prompt('Novo nome do hóspede:');
    const email = prompt('Novo email do hóspede:');

    fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email })
    })
    .then(response => response.json())
    .then(() => {
        listarHospedes(); // Atualiza a lista após editar
    });
}

// Função para excluir hóspede
function excluirHospede(id) {
    fetch(`${baseUrl}/${id}`, { method: 'DELETE' })
    .then(() => {
        listarHospedes(); // Atualiza a lista após excluir
    });
}

// Chama a função para listar hóspedes quando o script é carregado
listarHospedes();

// Adiciona evento ao formulário de adicionar hóspede
document.getElementById('formHospede').addEventListener('submit', adicionarHospede);
