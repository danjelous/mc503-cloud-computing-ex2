var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/api/articles', db.getAllArticles);
router.get('/api/articles/:id', db.getArticleById);
router.post('/api/articles', db.createArticle);
router.delete('/api/articles/:id', db.removeArticleById);

module.exports = router;