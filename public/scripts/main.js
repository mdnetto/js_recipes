var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var RecipeBox = require('./components/recipe_box.js');

ReactDOM.render(// eslint-disable-line no-undef
  <RecipeBox recipes_url='api/recipes' pollInterval={2000} />,
  document.getElementById('content')
)
