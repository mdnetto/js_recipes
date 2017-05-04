import $ from 'jquery';
import React, { Component }  from 'react';
import RecipeForm from './recipe_form.js';
import RecipeList from './recipe_list.js';

var add_recipe = {
	color: '#ccc',
	border: 'none',
	backgroundColor: 'white',
	fontFamily: 'raleway',
	fontSize: '30px',
	color: '#333',
}

var heading = {
	color: '#333',
	fontFamily: 'raleway',
	fontSize: '25px',
};

var top_nav = {
	color: '#ccc',
	border: 'none',
	backgroundColor: 'white',
	fontFamily: 'raleway',
	fontSize: '15px',
	padding: '20px',
	verticalAlign: 'top',
};

var list = {
	listStyle: 'none',
}

var li= {
	display: 'inline-block',	
	width: '15%',
}
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
  
	renderCategoriesInNav() {
		console.log(this.props);
    if (this.props.categories_url) {
      return this.state.categories.map(function (category, i) {
        return <li style={li} key={i} value={category}>{category}</li>
      })
    }
  }

  render() {
    return (
			<div className='recipeBox' style={heading}>
				<nav style={top_nav}>
					<ul style={list}>
						<li style={li}>
							<input
								type='submit' 
								className='add-button'
								style={add_recipe}
								value='+'
								onClick={this.handleAdd}
							/>
						</li>
						<li style={li}>Dinner</li>
						<li style={li}>Dessert</li>
						<li style={li}>Snacks</li>
						<li style={li}>Brekkie</li>
						<li style={li}>Soup</li>
						{this.renderCategoriesInNav()}
					</ul>
				</nav>
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
