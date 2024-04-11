const express = require('express');
const axios = require('axios');
const handlebars = require('express-handlebars');
const app = express();
const path = require('path');
const fs = require('fs');
const showdown = require('showdown');
const converter = new showdown.Converter({ moreStyling: true })

const htmlToRender = content => `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora de Matrizes | Heráclito Thiago</title>
    <link rel="icon" href="./img/ico.png" type="image/png">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');

        * {
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        body {
            font-family: "Nunito", sans-serif;
            font-optical-sizing: auto;
            font-style: normal;
        }

        pre{
            background-color: #f8f8f8;
            border: 1px solid #dfdfdf;
            max-width: 75%;
            line-height: 1.5;
            padding: 10px;
            border-radius: 5px;
            font-size: 14px;
        }

        .container {
            padding-left: 150px;
        }
    </style>
</head>
<body>
    <div class="container">
        ${content}
    </div>
</body>
</html>`

//Renderiza o README.md em HTML e salva no arquivo index.html na pasta public.
fs.readFile('README.md', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return;
    }
    const text = data.toString()
    const html = htmlToRender(converter.makeHtml(text))

    fs.writeFile('./public/index.html', html, (err) => {
        if (err) {
            console.error('Erro ao escrever no arquivo:', err);
        } else {
            console.log('Arquivo HTML salvo com sucesso');
        }
    })
})

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
    res.render('home', { isHome: true })
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

app.post('/transporta', async (req, res) => {
    const matriz = await req.body;

    try {
        const response = await axios.post(`${apiUrl}/transporta`, {
            matriz: matriz['matriz']['vetor']
        });
        res.status(200).json(response.data.transportada)
    } catch (error) {
        console.error('Erro ao transportar a matriz:', error);
    }
})

app.get('/produto', (req, res) => {
    res.render('produto')
})

app.post('/produto', async (req, res) => {
    const matriz1 = await req.body.matriz1;
    const matriz2 = await req.body.matriz2;

    try {
        const response = await axios.post(`${apiUrl}/produto`, {
            matriz1: matriz1['vetor'],
            matriz2: matriz2['vetor']
        });
        res.status(200).json(response.data.resultado)
    } catch (error) {
        console.error('Erro ao calcular o produto:', error);
    }
})

app.get('/conferir-quadrado-magico', (req, res) => {
    res.render('quadrado-magico')
})

app.post('/quadrado-magico', async (req, res) => {
    const matriz = await req.body.matriz;

    try {
        const response = await axios.post(`${apiUrl}/quadrado-magico`, {
            matriz: matriz
        })
        res.status(200).json(response.data)
    } catch (error) {
        res.status(200).json(error)
    }
})

app.get('/criar-quadrado-magico', (req, res) => {
    res.render('criar-quadrado-magico')
})

app.post('/criar-quadrado-magico', async (req, res) => {
    const size = await req.body.dimension;
    try {
        const response = await axios.post(`${apiUrl}/criar-quadrado-magico`, {
            dimension: size
        })
        res.status(200).json(response.data)
    } catch (error) {
        res.status(200).json(error)
    }
})

app.get('/determinante', (req, res) => {
    res.render('determinante')
})

app.post('/determinante', async (req, res) => {
    const matriz = await req.body.matriz;

    try {
        const response = await axios.post(`${apiUrl}/determinante`, {
            vetor: matriz
        })

        res.status(200).json(response.data)
    } catch (error) {
        res.status(200).json(error)
    }
})

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
