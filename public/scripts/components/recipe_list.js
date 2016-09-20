import $ from 'jquery';
import React, { Component } from 'react';
import Recipe from './recipe.js';
import _ from 'lodash'

export default class RecipeList extends Component {
	constructor(props) {
	  super(props);
		this.handleRecipeDelete = this.handleRecipeDelete.bind(this);
	}

  handleRecipeDelete(recipe_id) {
		console.log(this.props);
    $.ajax({
			url: this.props.recipes_url + '/' + recipe_id,
      dataType: 'json',
      type: 'DELETE',
      data: recipe_id,
      success: function (recipes) {
        this.setState({recipes: recipes})
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.recipes_url, status, err.toString())
      }.bind(this)
    })
  }

  render() {
    var recipes = _.orderBy(this.props.data, ['id'], ['desc'])
    var recipeNodes = recipes.map(recipe => (
			<Recipe
				handleRecipeDelete={this.handleRecipeDelete}
				image={recipe.image}
				name={recipe.name}
				key={recipe.id}
				id={recipe.id}
				category={recipe.category}
				ingredients={recipe.ingredients}
				method={recipe.method}
			/>
		))
    return (
      <div className='recipeList'>
        {recipeNodes}
      </div>
    );
  }
}
