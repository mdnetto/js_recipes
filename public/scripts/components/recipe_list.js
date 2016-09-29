import $ from 'jquery';
import React, { Component } from 'react';
import Recipe from './recipe.js';
import _ from 'lodash'

var recipe_list = {
		columnCount: '4',
		columnGap: '1%',
		columnFill: 'auto',
};

export default class RecipeList extends Component {
	constructor(props) {
	  super(props);
	}

  render() {
    var recipes = _.orderBy(this.props.data, ['id'], ['desc'])
    var recipeNodes = recipes.map(recipe => (
			<Recipe
				handleRecipeDelete={this.props.onRecipeDelete}
				image={recipe.image}
				name={recipe.name}
				key={recipe.id}
				id={recipe.id}
				category={recipe.category}
				ingredients={recipe.ingredients}
				method={recipe.method}
				recipes_url={this.props.recipes_url}
			/>
		))
    return (
      <div className='recipeList' style={recipe_list}>
        {recipeNodes}
      </div>
    );
  }
}
