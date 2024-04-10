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

def criar_vetor_quadrado_magico(n):
    # Verifique se n é ímpar
    if n % 2 == 0:
        return None, "O tamanho do vetor deve ser ímpar"

    # Crie uma matriz de zeros de tamanho n x n
    matriz = np.zeros((n, n), dtype=int)

    # Posição inicial (centro da primeira linha)
    i, j = 0, n // 2

    # Número a ser inserido
    num = 1

    while num <= n*n:
        # Insira o número na posição atual
        matriz[i, j] = num

        # Calcule a próxima posição
        novo_i, novo_j = (i - 1) % n, (j + 1) % n

        # Se a próxima posição já estiver ocupada, mova-se para baixo
        if matriz[novo_i, novo_j]:
            i = (i + 1) % n
        else:
            i, j = novo_i, novo_j

        num += 1

    return matriz.tolist(), None

@app.route('/vetor-quadrado-magico/<int:n>', methods=['GET'])
def vetor_quadrado_magico(n):
    vetor, error = criar_vetor_quadrado_magico(n)
    if error:
        return jsonify({"error": error}), 400
    return jsonify({"vetor": vetor})

@app.route('/quadrado-magico', methods=['POST'])
def quadrado_magico():
    data = request.json
    print("JSON recebido:", data)

    matriz = data.get('matriz', [])
    
    if matriz is None:
        print("Matriz não encontrada ou é None")
        return jsonify({'error': 'A chave "matriz" não foi encontrada ou seu valor é None'}), 400

    # Converter a matriz de strings para números inteiros
    matriz_np = np.array(matriz, dtype=int)
    print("Matriz criada:", matriz_np)

    # Verificar se matriz é uma matriz 2D e não está vazia
    if len(matriz_np.shape) != 2 or matriz_np.shape[0] != matriz_np.shape[1] or matriz_np.size == 0:
        print(f"Shape: {matriz_np.shape}, Size: {matriz_np.size}")
        return jsonify({'error': 'A matriz deve ser quadrada e não vazia'}), 400

    soma_linhas = np.sum(matriz_np, axis=1)
    soma_colunas = np.sum(matriz_np, axis=0)
    soma_diagonal_principal = np.trace(matriz_np)
    soma_diagonal_secundaria = np.trace(np.flip(matriz_np, axis=1))
    
    # debugs
    print(f"Soma das linhas: {soma_linhas}")
    print(f"Soma das colunas: {soma_colunas}")
    print(f"Soma da diagonal principal: {soma_diagonal_principal}")
    print(f"Soma da diagonal secundária: {soma_diagonal_secundaria}")

    if not np.all(soma_linhas == soma_colunas) or \
       not soma_linhas[0] == soma_diagonal_principal or \
       not soma_linhas[0] == soma_diagonal_secundaria:
        return jsonify({'resultado': 'A matriz não é um quadrado mágico'}), 200
    else:
        return jsonify({'resultado': 'A matriz é um quadrado mágico'}), 200

   

@app.route('/determinante', methods=['POST'])
def determinante():
    data = request.json
    matriz = np.array(data.get('matriz'))

    if len(matriz.shape) != 2 or matriz.shape[0] != matriz.shape[1]:
        return jsonify({'error': 'A matriz deve ser quadrada'}), 200

    determinante = np.linalg.det(matriz)
    return jsonify({'determinante': determinante}), 200
    
if __name__ == '__main__':
    app.run(debug=True)
