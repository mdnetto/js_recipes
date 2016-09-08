import $ from 'jquery';
import React, { Component } from 'react';
import Recipe from './recipe.js';

class RecipeList extends Component {

  render() {
    var recipes = _.orderBy(this.props.data, ['id'], ['desc'])
    var recipeNodes = recipes.map(function (recipe) {
      return (
        <Recipe
		  image={recipe.image}
          name={recipe.name}
          key={recipe.id}
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

export default RecipeList;
