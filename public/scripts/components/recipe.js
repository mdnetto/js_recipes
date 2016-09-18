import React, { Component } from 'react';

var recipeHeading = {
	color: '#657b83'
};

export default class Recipe extends Component {
	constructor(props) {
		super(props);
		this.state = { isEditing: false };
	}	

	handleRecipeDelete(e) {
	}

  render() {
    return (
      <div className='recipe'>
        <h2 className='recipeName' 
					style={recipeHeading}
				>
          {this.props.name}
        </h2>
        <input 
					type='submit' 
					value='Edit' 
				/>
        <input 
					type='submit' 
					value='Delete' 
					id={this.props.id} 
					onClick={this.handleRecipeDelete(this.props.recipe)} 
				/>
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
