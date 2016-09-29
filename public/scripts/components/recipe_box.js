import $ from 'jquery';
import React, { Component }  from 'react';
import RecipeForm from './recipe_form.js';
import RecipeList from './recipe_list.js';

var heading = {
	color: '#333',
	fontFamily: 'raleway',
	fontSize: '25px',
};

export default class RecipeBox extends Component { 
	constructor(props) {
	  super(props);
	  this.state = {recipes: []};
		this.handleRecipeSubmit = this.handleRecipeSubmit.bind(this);
		this.loadRecipesFromServer = this.loadRecipesFromServer.bind(this);
		this.handleRecipeDelete = this.handleRecipeDelete.bind(this);
	}

  componentDidMount() {
    this.loadRecipesFromServer()
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


  handleRecipeDelete(recipe_id) {
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
    return (
      <div className='recipeBox' style={heading}>
        <RecipeList 
					onRecipeDelete={this.handleRecipeDelete}
					recipes_url={this.props.recipes_url}
					data={this.state.recipes} 
				/>
        <RecipeForm 
					onRecipeSubmit={this.handleRecipeSubmit} 
					categories_url='api/categories' 
					units_url='api/units' 
				/>
      </div>
    );
  }
}
