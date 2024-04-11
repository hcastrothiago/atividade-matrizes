const btnGenerateMatrix = document.getElementById("generate");
const resultBox = document.getElementById('result')
const row = document.getElementById('i'), column = document.getElementById('i')
const calcularQuadradoMagico = document.getElementById("calcular-quadrado-magico")
const resultTransporta = document.getElementById("result-quadrado-magico")
const urlServer = "http://localhost:3000"
const randomicNumbers = document.getElementById('random')

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

    fetch(`${urlServer}/quadrado-magico`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matriz: arr })
    })
        .then(response => response.json())
        .then(data => {
            const message = !data.resultado
                ? "A matriz está vazia ou não foi criada"
                : data.resultado
            toastr["info"](`${message}`, "Resultado")
        })
        .catch(error => console.error(error))
})
