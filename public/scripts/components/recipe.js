import $ from 'jquery';
import React, { Component } from 'react';
import RecipeForm from './recipe_form.js';

var heading = {
	color: '#333',
	fontFamily: 'raleway',
	fontSize: '25px',
};

var recipe = {
	color: '#333',
	fontFamily: 'raleway',
	fontSize: '15px',
};

var list = {
	listStyle: 'none',
	padding: '0px'
};

var listItem = {
	padding: '3% 0',
};

var actions = {
	color: '#ccc',
	border: 'none',
	backgroundColor: 'white',
	fontFamily: 'raleway',
	fontSize: '15px',
	float: 'right',
};

var recipeCard = {
	float: 'left',
	margin: '1%',
	padding: '1%',
	width: '20%',
	lineHeight: '1em',
	borderStyle: 'dashed',
	borderLeft: 'none',
	borderBottom: 'none',
	borderRight: 'none',
	borderRadius: '5px',
	borderColor: '#ccc'
};

var dinner = {
	borderColor: 'red',	
};

export default class Recipe extends Component {
	constructor(props) {
		super(props);
		this.state = { isEditing: false };
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleRecipeEdit = this.handleRecipeEdit.bind(this);
	}	

	handleDelete() {
		//do we need to check for id and return false if no id?
		this.props.handleRecipeDelete(this.props.id);
	}

	handleEdit() {
		this.setState({isEditing: true});
	}

	handleRecipeEdit(recipe) {
    $.ajax({
      url: this.props.recipes_url + '/' + this.props.id,
      dataType: 'json',
      type: 'PUT',
      data: recipe,
      success: function (recipes) {
        this.setState({recipes: recipes})
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.recipes_url, status, err.toString())
      }.bind(this)
    })
	}

	handleCancel() {
		this.setState({isEditing:false});
	}
	
	renderActionSection() {
		if (this.state.isEditing) {
			return (
				<div>
					<input 
						type='submit' 
						value='Cancel' 
						onClick={this.handleCancel}/>
				</div>
			)
		}
		return (
			<div>
				<input
					type='submit' 
					className='delete-button'
					style={actions}
					value='X' 
					onClick={this.handleDelete}/>
				<input 
					type='submit' 
          className='edit-button'
					style={actions}
					value='Edit'
					onClick={this.handleEdit}/>
			</div>
		)
	}

	renderRecipeSection() {
		var category = this.props.category;
		if (this.state.isEditing) {
			return (
				<RecipeForm 
					recipe={this.props}
					onRecipeSubmit={this.handleRecipeEdit} 
					categories_url='api/categories' 
					units_url='api/units' 
				/>
			)
		}
		return (
			<div className='recipe' style={recipe}>
				<p className='recipe-name' style={heading}>{this.props.name}</p>
        <p className='recipe-category' style={}>
          {this.props.category}
        </p>
        <ul style={list}>
          {this.props.ingredients.map(function (ingredient, i) {
            return <li key={i}>{ingredient.quantity} {ingredient.unit} {ingredient.name} </li>
          })}
        </ul>
				<ul style={list}>
					{this.props.method.map(function (step, i) {
						return <li style={listItem} key={i}>{step}</li>
					})}
				</ul>
			</div>
		)
	}

  render() {
    return (
      <div style={recipeCard}>
				{this.renderActionSection()}
				{this.renderRecipeSection()}
      </div>
    );
  }
}
