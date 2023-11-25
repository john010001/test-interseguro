const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3002;

app.use(bodyParser.json());

// input = : [ [1,2], [3,4] ]
// output = : [ [2,4], [1,3] ]
app.post('/rotate-image', async (req, res) => {
    try {
        const { matrix } = req.body;

        // Validar que se reciba una matriz válida

        if (!matrix || !Array.isArray(matrix) || matrix.length === 0 || !matrix.every(row => Array.isArray(row) && row.length === matrix.length)) {
            throw new Error('La matriz proporcionada no es válida.');
        }

        // Rotar la matriz en sentido antihorario (90 grados)
        const rotatedMatrix = await rotateMatrix(matrix);
        console.log('Rotar la matriz en sentido antihorario (90 grados)');
        console.log(rotatedMatrix);
        // esto solo lo rota para verse como en el output de la prueba.
        const secondResult = rotatedMatrix.map(row => row.reverse());
        console.log('esto solo lo rota para verse como en el output de la prueba.')
        console.log(secondResult);
        const output = secondResult.reverse();
        console.log('output');
        console.log(output);

        res.json({ 
            rotatedMatrix90: rotatedMatrix,
            rotateOutput: output
         });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
});

function rotateMatrix(matrix) {
    const n = matrix.length;
    const rotatedMatrix = new Array(n).fill(0).map(() => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            rotatedMatrix[i][j] = matrix[n - j - 1][i];
        }
    }

    return rotatedMatrix;
}


app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
