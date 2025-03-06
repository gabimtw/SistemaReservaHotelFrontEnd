// Quartos.js

const baseUrl = 'http://localhost:3000/quartos'; // API para gerenciar quartos

// Função para listar quartos
function listarQuartos() {
    fetch(baseUrl)
        .then(response => response.json())
        .then(quartos => {
            const listaQuartos = document.getElementById('listaQuartos');
            listaQuartos.innerHTML = '';
            quartos.forEach(quarto => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${quarto.numero}</td>
                    <td>${quarto.tipo}</td>
                    <td>${quarto.preco}</td>
                    <td>
                        <button onclick="editarQuarto(${quarto.id})">Editar</button>
                        <button onclick="excluirQuarto(${quarto.id})">Excluir</button>
                    </td>
                `;
                listaQuartos.appendChild(tr);
            });
        });
}

// Função para adicionar quarto
function adicionarQuarto(event) {
    event.preventDefault();
    const numero = document.getElementById('numeroQuarto').value;
    const tipo = document.getElementById('tipoQuarto').value;
    const preco = document.getElementById('precoQuarto').value;

    fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numero, tipo, preco })
    })
    .then(response => response.json())
    .then(() => {
        listarQuartos(); // Atualiza a lista após adicionar
        document.getElementById('formQuarto').reset(); // Limpa o formulário
    });
}

// Função para editar quarto
function editarQuarto(id) {
    const numero = prompt('Novo número do quarto:');
    const tipo = prompt('Novo tipo de quarto:');
    const preco = prompt('Novo preço do quarto:');

    fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numero, tipo, preco })
    })
    .then(response => response.json())
    .then(() => {
        listarQuartos(); // Atualiza a lista após editar
    });
}

// Função para excluir quarto
function excluirQuarto(id) {
    fetch(`${baseUrl}/${id}`, { method: 'DELETE' })
    .then(() => {
        listarQuartos(); // Atualiza a lista após excluir
    });
}

// Chama a função para listar quartos quando o script é carregado
listarQuartos();

// Adiciona evento ao formulário de adicionar quarto
document.getElementById('formQuarto').addEventListener('submit', adicionarQuarto);
