const btnGenerateMatrix = document.getElementById("generate");
const resultBox = document.getElementById('result')
const row = document.getElementById('i'), column = document.getElementById('j')
const btnGerarTransporta = document.getElementById("btn-gerar-transporta")
const resultTransporta = document.getElementById("result-transporta")
const urlServer = "http://localhost:3000"
const randomicNumbers = document.getElementById('random')

let tempArr = []

btnGenerateMatrix.addEventListener('click', () => {
    document.querySelector(".icon")
        ?.classList.add("d-none")
        ?.classList.remove("d-flex")


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
            btnGerarTransporta.classList.remove("d-none")
            tempArr = data
        })
})

btnGerarTransporta.addEventListener('click', () => {
    let arr = []

    resultBox.childNodes.forEach((row, index) => {
        arr.push([])
        row.childNodes.forEach(box => {
            arr[index].push(box.value)
        })
    })

    document.querySelector(".icon")
        ?.classList.remove("d-none")
        ?.classList.add("d-flex")


    resultTransporta.innerHTML = "";
    resultTransporta.classList.add("div-parenteses")
    resultTransporta.classList.remove("d-none")

    fetch(`${urlServer}/transporta`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matriz: { vetor: arr } })
    }).then(response => response.json())
        .then(data => {
            const row = data?.length;
            const column = data[0].length;
            createMatrix(row, column, resultTransporta, "ii", "jj", true)
            fillMatrix(resultTransporta, data, "ii", "jj")
        })
})
