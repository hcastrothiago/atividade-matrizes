from flask import Flask, request, jsonify
import numpy as np

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)
