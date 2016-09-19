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
	}	

	handleDelete(e) {
		e.preventDefault();
		var id = this.props.id;
		console.log(id);
		if (!id) {
			return false;
		}
		this.props.handleRecipeDelete(id);
	}

	handleEdit(e) {
		e.preventDefault();
	}

  render() {
    return (
      <div className='recipe'>
					<h2 className='recipeName' style={recipeHeading}>{this.props.name}
					<input 
						type='submit' 
						value='Edit'
						onClick={this.handleEdit}/>
					<input 
						type='submit' 
						value='Delete' 
						onClick={this.handleDelete}/>
				</h2>
        <p 
					className='recipeCategory'>
          {this.props.category}
        </p>
        <ul>
          {this.props.ingredients.map(function (ingredient, i) {
            return <li key={i}>{ingredient.quantity} {ingredient.unit}, {ingredient.name} </li>
          })}
        </ul>
          {this.props.method}
      </div>
    );
  }
}
