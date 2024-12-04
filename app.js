const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(express.json()); // Middleware para parsear JSON

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API REST con Node.js y Swagger',
            version: '1.0.0',
            description: 'Documentación de una API REST creada con Node.js',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor Local',
            },
        ],
    },
    apis: ['./app.js'], // Documentación generada desde este archivo
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Obtiene un producto por ID
 *     parameters:
 *       - in: query
 *         name: product_id
 *         required: true
 *         description: ID del producto que deseas obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto obtenido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product_id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *       400:
 *         description: Parámetro faltante o inválido
 */
app.get('/api/product', (req, res) => {
    const productId = req.query.product_id;
    if (!productId) {
        return res.status(400).json({ error: 'El parámetro product_id es requerido' });
    }
    res.json({ product_id: productId, name: "Producto de ejemplo", price: 19.99 });
});

// Ruta principal para validar que el servidor funciona
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API REST con Node.js y Swagger!');
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});
