import $ from 'jquery';
import React, { Component } from 'react';
import Recipe from './recipe.js';

export default class RecipeList extends Component {

	constructor() {
	    super();
	}

  render() {
    var recipes = _.orderBy(this.props.data, ['id'], ['desc'])
    var recipeNodes = recipes.map(function (recipe) {
      return (
        <Recipe
					image={recipe.image}
          name={recipe.name}
          key={recipe.id}
          id={recipe.id}
          category={recipe.category}
          ingredients={recipe.ingredients}
          method={recipe.method}
        />
      )
    })
    return (
      <div className='recipeList'>
        {recipeNodes}
      </div>
    );
  }
}
