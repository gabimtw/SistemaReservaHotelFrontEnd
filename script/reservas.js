// Reservas.js

const baseUrl = 'http://localhost:3000/reservas'; // API para gerenciar reservas

// Função para listar reservas
function listarReservas() {
    fetch(baseUrl)
        .then(response => response.json())
        .then(reservas => {
            const listaReservas = document.getElementById('listaReservas');
            listaReservas.innerHTML = '';
            reservas.forEach(reserva => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${reserva.hospede}</td>
                    <td>${reserva.quarto}</td>
                    <td>${reserva.entrada}</td>
                    <td>${reserva.saida}</td>
                    <td>
                        <button onclick="editarReserva(${reserva.id})">Editar</button>
                        <button onclick="excluirReserva(${reserva.id})">Excluir</button>
                    </td>
                `;
                listaReservas.appendChild(tr);
            });
        });
}

// Função para adicionar reserva
function adicionarReserva(event) {
    event.preventDefault();
    const hospede = document.getElementById('hospede').value;
    const quarto = document.getElementById('quarto').value;
    const entrada = document.getElementById('entrada').value;
    const saida = document.getElementById('saida').value;

    fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hospede, quarto, entrada, saida })
    })
    .then(response => response.json())
    .then(() => {
        listarReservas(); // Atualiza a lista após adicionar
        document.getElementById('formReserva').reset(); // Limpa o formulário
    });
}

// Função para editar reserva
function editarReserva(id) {
    const hospede = prompt('Novo hóspede da reserva:');
    const quarto = prompt('Novo quarto da reserva:');
    const entrada = prompt('Nova data de entrada:');
    const saida = prompt('Nova data de saída:');

    fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hospede, quarto, entrada, saida })
    })
    .then(response => response.json())
    .then(() => {
        listarReservas(); // Atualiza a lista após editar
    });
}

// Função para excluir reserva
function excluirReserva(id) {
    fetch(`${baseUrl}/${id}`, { method: 'DELETE' })
    .then(() => {
        listarReservas(); // Atualiza a lista após excluir
    });
}

// Chama a função para listar reservas quando o script é carregado
listarReservas();

// Adiciona evento ao formulário de adicionar reserva
document.getElementById('formReserva').addEventListener('submit', adicionarReserva);
