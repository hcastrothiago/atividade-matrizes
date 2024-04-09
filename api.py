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
    print(resultado)
    return jsonify({'resultado': resultado.tolist()}), 200

@app.route('/transporta', methods=['POST'])
def transporta():
    data = request.json
    # print(data)
    matriz = np.array(data.get('matriz'))
    print(data['matriz'])

    transportada = matriz.transpose()
    return jsonify({'transportada': transportada.tolist()}), 200

    
if __name__ == '__main__':
    app.run(debug=True)
