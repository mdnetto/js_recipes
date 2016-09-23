var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var RECIPES_FILE = path.join(__dirname, 'json/recipes.json');
var UNITS_FILE = path.join(__dirname, 'json/units.json');
var CATEGORIES_FILE = path.join(__dirname, 'json/categories.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest recipes.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/recipes', function(req, res) {
  fs.readFile(RECIPES_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.get('/api/units', function(req, res) {
  fs.readFile(UNITS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.get('/api/categories', function(req, res) {
  fs.readFile(CATEGORIES_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/recipes', function(req, res) {
  fs.readFile(RECIPES_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var recipes = JSON.parse(data);
    var newRecipe = {
      id: Date.now(),
      name: req.body.name,
      category: req.body.category,
      ingredients: req.body.ingredients,
      method: req.body.method
    };
		
    recipes.push(newRecipe);
    fs.writeFile(RECIPES_FILE, JSON.stringify(recipes, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(recipes);
    });
  });
});

app.delete('/api/recipes/:id', function(req, res) {
  fs.readFile(RECIPES_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var recipes = JSON.parse(data);
		
		_.remove(recipes, recipe => recipe.id == req.params.id);
		console.log(recipes);
    fs.writeFile(RECIPES_FILE, JSON.stringify(recipes, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(recipes);
    });
  });
});

app.put('/api/recipes/:id', function(req, res) {
  fs.readFile(RECIPES_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var recipes = JSON.parse(data);

    var newRecipe = {
			id: req.params.id,
      name: req.body.name,
      category: req.body.category,
      ingredients: req.body.ingredients,
      method: req.body.method
    };

    replaceIfEdited = recipe => recipe.id == req.params.id ? newRecipe : recipe
		recipes = recipes.map(replaceIfEdited)
    fs.writeFile(RECIPES_FILE, JSON.stringify(recipes, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(recipes);
    });
  });
});
app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
