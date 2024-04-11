const btnGenerateMatrix = document.getElementById("generate");
const resultBox = document.getElementById('result')
const row = document.getElementById('i'), column = document.getElementById('i')
const calcularDeterminante = document.getElementById("btn-calcular-determinante")
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
            calcularDeterminante?.classList.remove("d-none")
            tempArr = data
        })
})

calcularDeterminante.addEventListener('click', () => {
    let arr = []
    resultBox.childNodes.forEach((row, index) => {
        arr.push([])
        row.childNodes.forEach(box => {
            arr[index].push(Number(box.value))
        })
    })

    fetch(`${urlServer}/determinante`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matriz: arr })
    })
        .then(response => response.json())
        .then(data => {
            const message = !data.determinante
                ? "A matriz está vazia"
                : "A determinante é " + data.determinante;
            toastr["info"](`${message}`, "Resultado")
        })
        .catch(error => console.error(error))
})
