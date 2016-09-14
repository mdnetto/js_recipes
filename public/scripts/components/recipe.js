import React, { Component } from 'react';

var recipeHeading = {
	color: '#657b83'
};

export default class Recipe extends Component {
	constructor(props) {
		super(props);
		this.handleRecipeDelete = this.handleRecipeDelete.bind(this);
	}	

	handleRecipeDelete(e) {
		e.preventDefault()
		console.log("we handle recipes delete " . this.props.id);
	}

  render() {
    return (
      <div className='recipe'>
        <h2 className='recipeName' style={recipeHeading}>
          {this.props.name}
        <input type='submit' value='Edit' />
        <input type='submit' value='Delete' id={this.props.id} onClick={this.handleRecipeDelete} />
        </h2>
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
    );
  }
}

