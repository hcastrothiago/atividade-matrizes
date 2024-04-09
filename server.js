const express = require('express');
const axios = require('axios');
const handlebars = require('express-handlebars');
const app = express();
const path = require('path');

//handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars')
app.set('views', './views');

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//path
app.use(express.static(path.join(__dirname, './public')))

const PORT = process.env.PORT || 3000;

const apiUrl = "http://127.0.0.1:5000"

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/vetor', async (req, res) => {
    const { i, j, isRandom } = req.body;

    try {
        const response = await axios.post(`${apiUrl}/vetor`, {
            i: i,
            j: j,
            isRandom: isRandom,
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ error: "Erro ao gerar: " + error.message });
    }
});

app.get('/transporta', (req, res) => {
    res.render('transporta')
})

app.post('/produto', async (req, res) => {
    // const matriz1 = await req.body.matriz1;
    // const matriz2 = await req.body.matriz2;

    // try {
    //     const response = await axios.post(`${apiUrl}/produto`, {
    //         matriz1: matriz1,
    //         matriz2: matriz2
    //     });
    //     console.log('Produto das matrizes:', response.data.resultado);
    //     res.status(200).json(response.data.resultado)
    // } catch (error) {
    //     console.error('Erro ao calcular o produto:', error);
    // }
    // res.render('produto')
})

app.post('/transporta', async (req, res) => {
    const matriz = await req.body;

    console.log(matriz['matriz']['vetor']);
    try {
        const response = await axios.post(`${apiUrl}/transporta`, {
            matriz: matriz['matriz']['vetor']
        });
        res.status(200).json(response.data.transportada)
    } catch (error) {
        console.error('Erro ao transportar a matriz:', error);
    }
})

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// // Função para enviar a solicitação POST para a rota 'produto'
// async function produto() {
//     try {
//         const response = await axios.post(`${apiUrl}/produto`, {
//             matriz1: matriz1,
//             matriz2: matriz2
//         });
//         console.log('Produto das matrizes:', response.data.resultado);
//     } catch (error) {
//         console.error('Erro ao calcular o produto:', error);
//     }
// }
