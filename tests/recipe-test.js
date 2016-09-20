import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Recipe from '../public/scripts/components/recipe';
import RecipeForm from '../public/scripts/components/recipe_form';

describe("Recipe component", function() {
	var props ={ 
				id:123, 
				name:'carrot soup', 
				category: 'dinner', 
				ingredients: [
					{ unit: 'cups' , 
						quantity: '4', 
						name: 'water' 
					}, 
				],
				method: ['boil']
			};

	  it("should display a recipe properties", function() {
		  expect(shallow(<Recipe {...props}/>).contains('carrot soup')).to.equal(true);
		  expect(shallow(<Recipe {...props}/>).contains('boil')).to.equal(true);
		  expect(shallow(<Recipe {...props}/>).contains('water')).to.equal(true);
	  });

	  it("should have an edit button", function() {
      var component = shallow(<Recipe {...props}/>);
		  expect(component.find('.edit-button')).to.have.length(1)
		});
	  it("should show edit form when edit button is clicked", function() {
      var component = shallow(<Recipe {...props}/>);
      expect(component.find(RecipeForm)).to.have.length(0)
      component.find('.edit-button').simulate('click')
      expect(component.find(RecipeForm)).to.have.length(1)
		});

	  it("should edit a recipe", function() {
		  expect(shallow(<Recipe {...props}/>).contains('stock')).to.equal(true);
		});

	  it("should delete a recipe", function() {

		});
});
