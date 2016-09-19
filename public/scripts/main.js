import $ from 'jquery';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RecipeBox from './components/recipe_box.js';

ReactDOM.render(
  <RecipeBox recipes_url='api/recipes' />,
  document.getElementById('content')
)
