import $ from 'jquery';
import React, { Component } from 'react';
import RecipeForm from './recipe_form.js';

var recipeHeading = {
	color: '#657b83'
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
		this.props.handleRecipeDelete(id);
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
					value='Edit'
					onClick={this.handleEdit}/>
				<input 
					type='submit' 
					value='Delete' 
					onClick={this.handleDelete}/>
			</div>
		)
	}

	renderRecipeSection() {
		if (this.state.isEditing) {
			console.log(this.props);
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
			<div>
				<h2 className='recipeName' style={recipeHeading}>{this.props.name}</h2>
        <p className='recipeCategory'>
          {this.props.category}
        </p>
        <ul>
          {this.props.ingredients.map(function (ingredient, i) {
            return <li key={i}>{ingredient.quantity} {ingredient.unit}, {ingredient.name} </li>
          })}
        </ul>
				{this.props.method}
			</div>
		)
	}

  render() {
    return (
      <div className='recipe'>
				{this.renderRecipeSection()}
				{this.renderActionSection()}
				<hr></hr>
      </div>
    );
  }
}
