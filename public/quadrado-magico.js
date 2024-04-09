const btnGenerateMatrix = document.getElementById("generate");
const resultBox = document.getElementById('result')
const row = document.getElementById('i'), column = document.getElementById('i')
const calcularQuadradoMagico = document.getElementById("calcular-quadrado-magico")
const resultTransporta = document.getElementById("result-quadrado-magico")
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

let tempArr = []

btnGenerateMatrix.addEventListener('click', () => {
    resultTransporta.classList.remove("div-parenteses")
    resultTransporta.innerHTML = "";

    resultBox.innerHTML = "";
    createMatrix(row.value, column.value, resultBox, "i", "j")

    resultBox.classList.add("div-parenteses")

    fetch(`${urlServer}/vetor`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ i: row.value, j: column.value, isRandom: randomicNumbers.checked })
    })
        .then(response => response.json())
        .then(data => {
            fillMatrix(resultBox, data.vetor, "i", "j")
            calcularQuadradoMagico.classList.remove("d-none")
            tempArr = data
        })
})

calcularQuadradoMagico.addEventListener('click', () => {
    let arr = []
    resultBox.childNodes.forEach((row, index) => {
        arr.push([])
        row.childNodes.forEach(box => {
            arr[index].push(box.value)
        })
    })

    console.log(arr);
    fetch(`${urlServer}/quadrado-magico`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matriz: arr })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.resultado)
        })
        .catch(error => console.error(error))
})
