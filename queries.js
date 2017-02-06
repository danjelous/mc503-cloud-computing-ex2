var promise = require('bluebird');
var util = require('util');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/fleamarket';
var db = pgp(connectionString);

function getAllArticles(req, res, next) {

  // Check whether parameters are present
  var priceBelow = req.query.priceBelow,
      priceAbove = req.query.priceAbove,
      responseMessage = "Retrieved all articles",
      dBQueryString = 'select * from articles';
      
  // Check if priceBelow parameter
  if(priceBelow && parseFloat(priceBelow)) {
      
      // Check if comma
      if(priceBelow.indexOf(",") > -1) {
        tempArr = priceBelow.split(",");
        priceBelow = parseFloat(tempArr[0] + "." + tempArr[1]);
      }

      dBQueryString = "select * from articles where articles.price < " + priceBelow;
      responseMessage = "Showing all articles with price below " + priceBelow;
  }

  // Check if priceAbove parameter
  if(priceAbove && parseFloat(priceAbove)) {
      
      // Check if comma
      if(priceAbove.indexOf(",") > -1) {
        tempArr = priceAbove.split(",");
        priceAbove = parseFloat(tempArr[0] + "." + tempArr[1]);
      }

      dBQueryString = "select * from articles where articles.price > " + priceAbove;
      responseMessage = "Showing all articles with price above " + priceAbove;
  }

  // Check user used both parameters
  if(priceAbove && priceBelow) {
    dBQueryString = 'select * from articles';
    responseMessage = "Showing all articles";      
  }

  db.any(dBQueryString)
    .then(function (data) {

      var respStatus = "success";

      if(data.length == 0) {
        respStatus = "no content"
        responseMessage = "No articles to show!";
      }

      res.status(200).json({
          status: respStatus,
          data: data,
          message: responseMessage
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

      // ID found
      if(data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved article using ID ' + articleId + '.'
          });
      } else {
        res.status(204)
          .json({
            status: 'no content',
            message: 'Article with ID ' + articleId + ' not found!'
          });
      }

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
