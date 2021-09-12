const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../data/api-doc.json');
const swaggerOptions = { explorer: true };
const dataActions = require('../data/dbData');

/* GET api-docs. Gets the api documentation adapted to the open api spec. */
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument, swaggerOptions));

/* GET coffees. Gets all coffees. */
router.get('/coffees', async function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
      .contentType("application/json");

  await dataActions.getAll()
      .then(data => {
        if (data && data.length > 0) {
          return res.status(200).json(data);
        }
        res.status(404).json("Resource not found.");
      })
      .catch(err => res.status(500).json(err));
});

/* GET coffees/category. Gets coffees by given category parameter. */
router.get('/coffees/category/:category', async function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
      .contentType("application/json");

  await dataActions.getByCategory(req.params.category)
      .then(data => {
        if (data && data.length > 0) {
          return res.status(200).json(data);
        }
        res.status(404).json("Resource not found.");
      })
      .catch(err => res.status(500).json(err));
});

/* GET coffees/search. Gets coffees including the given text. */
router.get('/coffees/search/:filter', async function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
      .contentType("application/json");

  await dataActions.getByFilter(req.params.filter)
      .then(data => {
        if (data && data.length > 0) {
          return res.status(200).json(data);
        }
        res.status(404).json(null);
      })
      .catch(err => res.status(500).json(err));
});

module.exports = router;
