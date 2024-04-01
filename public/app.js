const btnGenerateMatrix = document.getElementById("generate");
const resultBox = document.getElementById('result')
const lenghtMatrix = document.getElementById('lenght')
const randomicNumbers = document.getElementById('random')

function createMatrix(dimension) {
    const row = dimension, column = dimension

    for (let i = 0; i < row; i++) {
        const divRow = document.createElement('div')
        divRow.classList.add('row')

        divRow.id = `i-${i}`
        resultBox.appendChild(divRow)

        for (let j = 0; j < column; j++) {
            const box = document.createElement('input')
            box.classList.add('box')

            box.id = `j-${j}`

            document.getElementById(`i-${i}`)
                .appendChild(box)
        }

    }
}


function generateRandomMatrix(n, isRandom) {
    const matrix = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            if (isRandom == true) {
                row.push(Math.floor(Math.random() * 11))
            } else {
                row.push(0)
            }
        }
        matrix.push(row);
    }
    return matrix;
}

btnGenerateMatrix.addEventListener('click', () => {
    resultBox.innerHTML = "";

    const dimension = parseInt(lenghtMatrix.value);
    createMatrix(dimension)
    const matrix = generateRandomMatrix(dimension, randomicNumbers.checked)

    resultBox.classList.add("div-parenteses")
    const isRandom = randomicNumbers.checked;
    if (isRandom == true) {
        for (let i = 0; i < dimension; i++) {
            for (let j = 0; j < dimension; j++) {
                document.querySelector(`#i-${i}`).querySelector(`#j-${j}`)
                    .value = matrix[i][j]
            }
        }
    }

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        cors: 'no-cors',
        body: JSON.stringify(matrix)
    }
    fetch('http://localhost:5000/transporta', config)
        .then(result => result.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => console.log(err))
    // console.log(JSON.stringify(matrix));

})