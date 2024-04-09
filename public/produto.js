const btnGenerateMatrix = document.getElementById("generate");
const matriz1 = document.getElementById('matriz1')
const matriz2 = document.getElementById('matriz2')
const row = document.getElementById('i'), column = document.getElementById('j')
const btnGerarProduto = document.getElementById("btn-gerar-produto")
const resultProduto = document.getElementById("result-produto")
const urlServer = "http://localhost:3000"
const randomicNumbers = document.getElementById('random')

function createMatrix(row, column, parentEl, keyI, keyJ) {
    for (let i = 0; i < row; i++) {
        const divRow = document.createElement('div')
        divRow.classList.add('row')

        divRow.id = `${keyI}-${i}`
        divRow.dataset.key = `${keyI}-${i}`;
        parentEl.appendChild(divRow)

        for (let j = 0; j < column; j++) {
            const box = document.createElement('input')
            box.classList.add('box')

            box.id = `${keyJ}-${j}`
            box.dataset.key = `${keyJ}-${j}`;

            document.getElementById(`${keyI}-${i}`)
                .appendChild(box)
        }
    }
}

function fillMatrix(parentEl, matrix, keyI, keyJ) {
    for (let external = 0; external < matrix.length; external++) {
        for (let internal = 0; internal < matrix[external].length; internal++) {
            parentEl.querySelector(`#${keyI}-${external}`).querySelector(`#${keyJ}-${internal}`)
                .value = matrix[external][internal]
        }
    }
}

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
            console.log(data);
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
            createMatrix(data.length, data.length, resultProduto, "ii", "jj")
            fillMatrix(resultProduto, data, "ii", "jj")
        })
        .catch(error => {
            console.log(error);
        })
})
