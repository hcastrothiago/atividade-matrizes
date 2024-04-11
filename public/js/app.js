function createMatrix(row, column, parentEl, keyI, keyJ, disabled = false) {
    for (let i = 0; i < row; i++) {
        const divRow = document.createElement('div')
        divRow.classList.add('row')

        divRow.id = `${keyI}-${i}`
        divRow.dataset.key = `${keyI}-${i}`;
        parentEl.appendChild(divRow)

        for (let j = 0; j < column; j++) {
            const box = document.createElement('input')
            box.setAttribute("type", "number")
            disabled == true ? box.setAttribute("disabled", true) : ""
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