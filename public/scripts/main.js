import $ from 'jquery';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RecipeBox from './components/recipe_box.js';

ReactDOM.render(// eslint-disable-line no-undef
  <RecipeBox recipes_url='api/recipes' pollInterval={5000} />,
  document.getElementById('content')
)
