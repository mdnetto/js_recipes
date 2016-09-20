import $ from 'jquery';
import React, { Component } from 'react';

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
		this.handleSaveEdit = this.handleSaveEdit.bind(this);
	}	

	handleDelete() {
		//do we need to check for id and return false if no id?
		this.props.handleRecipeDelete(id);
	}

	handleEdit() {
		this.setState({isEditing: true});
	}

	handleCancel() {
		this.setState({isEditing:false});
	}
	
	handleSaveEdit() {
		this.props.handleRecipeSave(id);
	}

	renderActionSection() {
		if (this.state.isEditing) {
			return (
				<div>
					<input 
						type='submit' 
						value='Save'
						onClick={this.handleSaveEdit}/>
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
				{this.renderActionSection()}
				{this.renderRecipeSection()}
      </div>
    );
  }
}
