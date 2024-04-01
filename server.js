const axios = require('axios');

// Definindo as matrizes para teste
const matriz1 = [
    [1, 2],
    [3, 4]
];

const matriz2 = [
    [5, 6],
    [7, 8]
];

const matriz = [
    [1, 2],
    [3, 4],
    [5, 6]
];

// URL da sua API Flask
const apiUrl = 'http://localhost:5000';

// Função para enviar a solicitação POST para a rota 'produto'
async function produto() {
    try {
        const response = await axios.post(`${apiUrl}/produto`, {
            matriz1: matriz1,
            matriz2: matriz2
        });
        console.log('Produto das matrizes:', response.data.resultado);
    } catch (error) {
        console.error('Erro ao calcular o produto:', error);
    }
}

// Função para enviar a solicitação POST para a rota 'transporta'
async function transporta() {
    try {
        const response = await axios.post(`${apiUrl}/transporta`, {
            matriz: matriz
        });
        console.log('Matriz transportada:', response.data.transportada);
    } catch (error) {
        console.error('Erro ao transportar a matriz:', error);
    }
}

// Chamando as funções para enviar as solicitações
produto();
transporta();
