// Pagamentos.js

const baseUrl = 'http://localhost:3000/pagamentos'; // API para gerenciar pagamentos

// Função para listar pagamentos
function listarPagamentos() {
    fetch(baseUrl)
        .then(response => response.json())
        .then(pagamentos => {
            const listaPagamentos = document.getElementById('listaPagamentos');
            listaPagamentos.innerHTML = '';
            pagamentos.forEach(pagamento => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${pagamento.hospede}</td>
                    <td>${pagamento.valor}</td>
                    <td>${pagamento.data}</td>
                    <td>
                        <button onclick="editarPagamento(${pagamento.id})">Editar</button>
                        <button onclick="excluirPagamento(${pagamento.id})">Excluir</button>
                    </td>
                `;
                listaPagamentos.appendChild(tr);
            });
        });
}

// Função para adicionar pagamento
function adicionarPagamento(event) {
    event.preventDefault();
    const hospede = document.getElementById('hospedePagamento').value;
    const valor = document.getElementById('valorPagamento').value;
    const data = document.getElementById('dataPagamento').value;

    fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hospede, valor, data })
    })
    .then(response => response.json())
    .then(() => {
        listarPagamentos(); // Atualiza a lista após adicionar
        document.getElementById('formPagamento').reset(); // Limpa o formulário
    });
}

// Função para editar pagamento
function editarPagamento(id) {
    const hospede = prompt('Novo hóspede do pagamento:');
    const valor = prompt('Novo valor do pagamento:');
    const data = prompt('Nova data do pagamento:');

    fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hospede, valor, data })
    })
    .then(response => response.json())
    .then(() => {
        listarPagamentos(); // Atualiza a lista após editar
    });
}

// Função para excluir pagamento
function excluirPagamento(id) {
    fetch(`${baseUrl}/${id}`, { method: 'DELETE' })
    .then(() => {
        listarPagamentos(); // Atualiza a lista após excluir
    });
}

// Chama a função para listar pagamentos quando o script é carregado
listarPagamentos();

// Adiciona evento ao formulário de adicionar pagamento
document.getElementById('formPagamento').addEventListener('submit', adicionarPagamento);
