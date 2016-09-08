import React, { Component } from 'react';

class RecipeIngredients extends Component {
	constructor() {
	  super();
		this.intialiseIngredientOnEnter = this.initialiseIngredientOnEnter.bind(this);
	}

  initialiseIngredientOnEnter(e) {
		if (e.keyCode == 13) {
			e.preventDefault() //prevent it from doign it's own thing
		  this.props.initialiseIngredient();
		}
  }

  render() {
	var that = this;
    return (
      <div className='recipeIngredients'>
        <h1>Ingredients</h1>
					{this.props.ingredients.map(function(ingredient, i) {
						return(
							<p key={i}>
								<input autoFocus type='text' value={ingredient.name} onChange={function(e) {that.props.handleIngredientNameEdit(e.target.value, i)}} onKeyDown={that.initialiseIngredientOnEnter} /> 
							</p>
						)})
					}
      </div>
    );
  }
}	

export default RecipeIngredients;
