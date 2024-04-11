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

btnGenerateMatrix.setAttribute('style', 'cursor: not-allowed;')
const forms = document.querySelectorAll('.form-control')

forms.forEach(input => {
    input.addEventListener('input', () => {
        const todosPreenchidos = [...forms].every(input => input.value.trim() !== '');

        if (todosPreenchidos) {
            btnGenerateMatrix.removeAttribute('disabled');
        } else {
            btnGenerateMatrix.setAttribute('disabled', 'disabled');
            btnGenerateMatrix.removeAttribute('style', 'cursor: not-allowed;')
        }
    });
});

btnGenerateMatrix.addEventListener('click', () => {
    btnGerarProduto.classList.remove("d-none")
    //Limpa o vetor no começo caso esteja preenchido
    resultProduto.innerHTML = "";
    resultProduto.classList.remove("div-parenteses")
    resultProduto.classList.add("d-none")

    matriz1.innerHTML = "";
    createMatrix(row.value, column.value, matriz1, "i", "j")
    matriz1.classList.add("div-parenteses")

    matriz2.innerHTML = "";
    createMatrix(column.value, row.value, matriz2, "m", "n")
    matriz2.classList.add("div-parenteses")

    //pega somente o primeiro ícone
    document.querySelector(".icon")
        .classList.remove("d-none")
    document.querySelector(".icon")
        .classList.add("d-flex")


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

    document.querySelectorAll(".icon").forEach(el => {
        el?.classList.remove("d-none")
        el.classList.add("d-flex")
    })

    tempArr1 = { vetor: [] }
    tempArr2 = { vetor: [] }

    matriz1.childNodes.forEach((row, index) => {
        tempArr1.vetor.push([])
        row.childNodes.forEach(box => {
            tempArr1.vetor[index].push(Number(box.value))
        })
    })

    matriz2.childNodes.forEach((row, index) => {
        tempArr2.vetor.push([])
        row.childNodes.forEach(box => {
            tempArr2.vetor[index].push(Number(box.value))
        })
    })

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
