from flask import Flask, request, jsonify
import numpy as np

app = Flask(__name__)

@app.route('/vetor', methods=['POST'])
def vetor():
    try:
        data = request.json
        i = int(data.get('i'))
        j = int(data.get('j'))
        isRandom = data.get('isRandom', True)
        
        if isRandom:
            vetor_aleatorio = np.random.randint(0, 11, (i, j))
            return jsonify({'vetor': vetor_aleatorio.tolist()}), 200
        else:
            vetor_zeros = np.zeros((i, j), dtype=int)
            return jsonify({'vetor': vetor_zeros.tolist()}), 200
    except Exception as e:
        print(f"Erro: {e}")
        return jsonify({'error': f"Erro interno do servidor: {e}"}), 500

@app.route('/produto', methods=['POST'])
def produto():
    data = request.json
    matriz1 = np.array(data.get('matriz1'))
    matriz2 = np.array(data.get('matriz2'))

    if matriz1.shape[1] != matriz2.shape[0]:
        return jsonify({'error': 'As dimensões das matrizes não são compatíveis para multiplicação'}), 400

    resultado = np.dot(matriz1, matriz2)
    return jsonify({'resultado': resultado.tolist()}), 200

@app.route('/transporta', methods=['POST'])
def transporta():
    data = request.json
    matriz = np.array(data.get('matriz'))

    transportada = matriz.transpose()
    return jsonify({'transportada': transportada.tolist()}), 200

def magic(n):
    n = int(n)
    if n < 3:
        raise ValueError("Size must be at least 3")
    if n % 2 == 1:
        p = np.arange(1, n+1)
        return n*np.mod(p[:, None] + p - (n+3)//2, n) + np.mod(p[:, None] + 2*p-2, n) + 1
    elif n % 4 == 0:
        J = np.mod(np.arange(1, n+1), 4) // 2
        K = J[:, None] == J
        M = np.arange(1, n*n+1, n)[:, None] + np.arange(n)
        M[K] = n*n + 1 - M[K]
    else:
        p = n//2
        M = magic(p)
        M = np.block([[M, M+2*p*p], [M+3*p*p, M+p*p]])
        i = np.arange(p)
        k = (n-2)//4
        j = np.concatenate((np.arange(k), np.arange(n-k+1, n)))
        M[np.ix_(np.concatenate((i, i+p)), j)] = M[np.ix_(np.concatenate((i+p, i)), j)]
        M[np.ix_([k, k+p], [0, k])] = M[np.ix_([k+p, k], [0, k])]
    return M

@app.route('/criar-quadrado-magico', methods=['POST'])
def criar_quadrado_magico():
    data = request.json
    dimension = data.get('dimension')
    try:
        vetor = magic(dimension)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    print(vetor)
    return jsonify({"vetor": vetor.tolist()})


@app.route('/quadrado-magico', methods=['POST'])
def quadrado_magico():
    data = request.json
    matriz = data.get('matriz')

    if matriz is None:
        return {'error': 'A chave "matriz" não foi encontrada ou seu valor é None'}, 400

    # Converter a matriz de strings para números inteiros
    matriz_np = np.array(matriz, dtype=int)

    n = len(matriz_np)

    # Verificar se matriz é uma matriz 2D e não está vazia
    if len(matriz_np.shape) != 2 or matriz_np.shape[0] != matriz_np.shape[1] or n == 0:
        return {'error': 'A matriz deve ser quadrada e não vazia'}, 400

    # Calcula a soma esperada
    soma_esperada = n * (n**2 + 1) // 2

    soma_linhas = np.sum(matriz_np, axis=1)
    soma_colunas = np.sum(matriz_np, axis=0)
    soma_diagonal_principal = np.trace(matriz_np)
    soma_diagonal_secundaria = np.trace(np.flip(matriz_np, axis=1))

    if not np.all(soma_linhas == soma_colunas) or \
       not soma_linhas[0] == soma_diagonal_principal or \
       not soma_linhas[0] == soma_diagonal_secundaria or \
       not np.all(soma_linhas == soma_esperada):
        return {'resultado': 'A matriz não é um quadrado mágico'}, 200
    else:
        return {'resultado': 'A matriz é um quadrado mágico'}, 200


@app.route('/determinante', methods=['POST'])
def determinante():
    data = request.json
    matriz = np.array(data.get('vetor'))

    if len(matriz.shape) != 2 or matriz.shape[0] != matriz.shape[1]:
        return jsonify({'error': 'A matriz deve ser quadrada'}), 200

    if np.all(np.equal(np.mod(matriz, 1), 0)):
        determinante = int(np.linalg.det(matriz))
    else:
        determinante = round(np.linalg.det(matriz), 4)

    print("Determinante:", determinante)
    return jsonify({'determinante': determinante}), 200
    
if __name__ == '__main__':
    app.run(debug=True)
