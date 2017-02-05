var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/fleamarket';
var db = pgp(connectionString);

function getAllArticles(req, res, next) {
  db.any('select * from articles')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all articles.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getArticleById(req, res, next) {
  var articleId = parseInt(req.params.id);
  db.one('select * from articles where id = $1', articleId)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved article using ID ' + articleId
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createArticle(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into articles(picture_path, name, description, price)' +
      'values(${picture_path}, ${name}, ${description}, ${price})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted article successfully.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeArticleById(req, res, next) {
  var articleId = parseInt(req.params.id);
  db.result('delete from articles where id = $1', articleId)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} article`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  getAllArticles: getAllArticles,
  getArticleById: getArticleById,
  createArticle: createArticle,
  removeArticleById: removeArticleById
};
