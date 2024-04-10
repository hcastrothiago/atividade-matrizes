const btnGenerateMatrix = document.getElementById("generate");
const matriz1 = document.getElementById('matriz1')
const matriz2 = document.getElementById('matriz2')
const row = document.getElementById('i'), column = document.getElementById('j')
const btnGerarProduto = document.getElementById("btn-gerar-produto")
const resultProduto = document.getElementById("result-produto")
const urlServer = "http://localhost:3000"
const randomicNumbers = document.getElementById('random')

let tempArr1 = []
let tempArr2 = []

btnGenerateMatrix.addEventListener('click', () => {
    //clean
    resultProduto.innerHTML = "";
    resultProduto.classList.remove("div-parenteses")
    resultProduto.classList.add("d-none")

    matriz1.innerHTML = "";
    createMatrix(row.value, column.value, matriz1, "i", "j")
    matriz1.classList.add("div-parenteses")

    matriz2.innerHTML = "";
    createMatrix(column.value, row.value, matriz2, "m", "n")
    matriz2.classList.add("div-parenteses")

    document.querySelectorAll(".icon").forEach(el => el?.classList.remove("d-none"))

    //Matriz1
    fetch(`${urlServer}/vetor`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ i: row.value, j: column.value, isRandom: randomicNumbers.checked })
    })
        .then(response => response.json())
        .then(data => {
            fillMatrix(matriz1, data.vetor, "i", "j")
            tempArr1 = data
        })

    //Matriz2
    fetch(`${urlServer}/vetor`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ i: column.value, j: row.value, isRandom: randomicNumbers.checked })
    })
        .then(response => response.json())
        .then(data => {
            fillMatrix(matriz2, data.vetor, "m", "n")
            tempArr2 = data
        })
})

btnGerarProduto.addEventListener('click', () => {
    resultProduto.innerHTML = "";
    resultProduto.classList.add("div-parenteses")
    resultProduto.classList.remove("d-none")

    //Produto
    fetch(`${urlServer}/produto`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matriz1: tempArr1, matriz2: tempArr2 })
    })
        .then(response => response.json())
        .then(data => {
            createMatrix(data.length, data.length, resultProduto, "ii", "jj", true)
            fillMatrix(resultProduto, data, "ii", "jj")
        })
        .catch(error => {
            console.log(error);
        })
})
