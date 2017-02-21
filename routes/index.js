var express = require('express');
var router = express.Router();

var db = require('../queries');
var mail = require('../addons/mailgun');

/**  ----------------------------------------------
 *   ----------- SWAGGER DEFINITIONS --------------
 *   ---------------------------------------------* /
/**
 * @swagger
 * definitions:
 *   Article:
 *     type: object
 *     properties:
 *       picture_path:
 *         type: string
 *         description: Path representing the image resource on the server.
 *       name:
 *         type: string
 *         description: Name of the article.
 *       description:
 *         type: string
 *         description: Description of the article.
 *       price:
 *         type: number
 *         description: Price of the article in Euros. '9.99' for example.
 */



/**  ----------------------------------------------
 *   ---------------- ENDPOINTS -------------------
 *   ---------------------------------------------* /
/**
 * @swagger
 * /api/articles:
 *   get:
 *     tags:
 *       - Articles
 *     description: Returns all articles
 *     parameters:
 *      - name: priceAbove
 *        in: query
 *        description: Parameter to only get articles above a certain price. 
 *        required: false
 *        type: number
 *        format: number
 *      - name: priceBelow
 *        in: query
 *        description: Parameter to only get articles below a certain price. 
 *        required: false
 *        type: number
 *        format: number
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of articles
 *         schema:
 *           $ref: '#/definitions/Article'
 */
router.get('/api/articles', db.getAllArticles);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     tags:
 *       - Articles
 *     description: Returns a single article by it's ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Article ID
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single article
 *         schema:
 *           $ref: '#/definitions/Article'
 */
router.get('/api/articles/:id', db.getArticleById);

/**
 * @swagger
 * /api/articles:
 *   post:
 *     tags:
 *       - Articles
 *     description: Creates a new article
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: article
 *         description: Article object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Article'
 *     responses:
 *       200:
 *         description: Article successfully created
 */
router.post('/api/articles', db.createArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     tags:
 *       - Articles
 *     description: Deletes a single article
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Article ID
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Article successfully deleted
 */
router.delete('/api/articles/:id', db.removeArticleById);

// Send mail
router.post('/api/mail/send', mail.sendMailTo);


/**  ----------------------------------------------
 *   ----------- NOT ALLOWED ENDPOINTS ------------
 *   ---------------------------------------------* */


function notAllowed(req, res) {
    res.status(405)
        .json({
            status: 'method not allowed',
            message: "You better don't..."
        });
}

router.delete("/api/articles", notAllowed);
router.put("/api/articles", notAllowed);
router.post("/api/articles/:id", notAllowed);
router.put("/api/articles/:id", notAllowed);

module.exports = router;