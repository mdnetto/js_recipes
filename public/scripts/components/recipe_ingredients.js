import React, { Component } from 'react';

export default class RecipeIngredients extends Component {
	constructor(props) {
	  super(props);
		this.initialiseIngredientOnEnter = this.initialiseIngredientOnEnter.bind(this);
	}

  initialiseIngredientOnEnter(e) {
		if (e.keyCode == 13) {
			e.preventDefault() //prevent it from doign it's own thing
		  this.props.initialiseIngredient();
		}
  }

  render() {
    return (
      <div className='recipeIngredients'>
        <h1>Ingredients</h1>
					{this.props.ingredients.map((ingredient, i) => {
						return(
							<p key={i}>
								<input 
									autoFocus type='text' 
									value={ingredient.name} 
									onChange = {
										(e) => (
											this.props.handleIngredientNameEdit(e.target.value, i)
										)} 
									onKeyDown={this.initialiseIngredientOnEnter} 
								/> 
							</p>
						)})
					}
      </div>
    );
  }
}	
