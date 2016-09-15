import $ from 'jquery';
import React, { Component }  from 'react';
import RecipeForm from './recipe_form.js';
import RecipeList from './recipe_list.js';

export default class RecipeBox extends Component { 

	constructor() {
	    super();
	    this.state = {recipes: []};
			this.loadRecipesFromServer = this.loadRecipesFromServer.bind(this);
			this.handleRecipeSubmit = this.handleRecipeSubmit.bind(this);
			this.componentDidMount = this.componentDidMount.bind(this);
	}

  componentDidMount() {
    this.loadRecipesFromServer()
    setInterval(this.loadRecipesFromServer, this.props.pollInterval)
  }

  loadRecipesFromServer() {
    $.ajax({ 
      url: this.props.recipes_url,
      dataType: 'json',
      cache: false,
      success: function (recipes) {
        this.setState({recipes: recipes})
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.recipes_url, status, err.toString())
      }.bind(this)
    })
  }

  handleRecipeSubmit(recipe) {
    $.ajax({
      url: this.props.recipes_url,
      dataType: 'json',
      type: 'POST',
      data: recipe,
      success: function (recipes) {
        this.setState({recipes: recipes})
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.recipes_url, status, err.toString())
      }.bind(this)
    })
  }

  render() {
    return (
      <div className='recipeBox'>
        <h1>Recipes</h1>
        <RecipeForm onRecipeSubmit={this.handleRecipeSubmit} categories_url='api/categories' units_url='api/units' />
        <RecipeList data={this.state.recipes} />
      </div>
    );
  }
}
