import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Recipe from '../public/scripts/components/recipe';

describe("Recipe component", function() {
	var props ={ 
				id:0, 
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

	  it("should edit a recipe", function() {
			
		  expect(shallow(<Recipe {...props}/>).contains('stock')).to.equal(true);
		});

	  it("should delete a recipe", function() {

		});
});
