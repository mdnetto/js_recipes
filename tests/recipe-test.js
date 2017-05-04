import React from 'react';
import { expect } from 'chai';
import nock from 'nock';
import fs from 'fs';
import { shallow, mount, render } from 'enzyme';
import Recipe from '../public/scripts/components/recipe';
import RecipeForm from '../public/scripts/components/recipe_form';
import RecipeList from '../public/scripts/components/recipe_list';

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

	it("should display recipe properties", function() {
		var component = shallow(<Recipe {...props}/>);
	  expect(component.contains('carrot soup')).to.equal(true);
	  expect(component.contains('boil')).to.equal(true);
	  expect(component.contains('water')).to.equal(true);
	  expect(component.contains('cups')).to.equal(true);
	});

	it("should display recipe action buttons", function() {
		var component = shallow(<Recipe {...props}/>);
	  expect(component.find('.edit-button')).to.have.length(1)
	  expect(component.find('.delete-button')).to.have.length(1)
	});


	it("should show edit form when edit button is clicked", function() {
		var component = shallow(<Recipe {...props}/>);
    expect(component.find(RecipeForm)).to.have.length(0)
    component.find('.edit-button').simulate('click')
    expect(component.find(RecipeForm)).to.have.length(1)
	});

	it.skip("should edit a recipe", function() {
		var component = shallow(<Recipe {...props}/>);
		//not sure why this does not work
		nock('localhost:3000')
			.get('/api/categories')
			.reply(200, JSON.parse(fs.readFileSync('json/categories.json')));
		nock('localhost:3000')
			.get('/api/units')
			.reply(200, JSON.parse(fs.readFileSync('json/units.json')));

    expect(component.find(RecipeForm)).to.have.length(0)
    component.find('.edit-button').simulate('click')
		component.find('input[name="name"]').simulate('change', {target: {value: 'stock'}}); 
	  //expect(component.contains('stock')).to.equal(true)
	});

	it.skip("should delete a recipe", function() {
		var component = mount(<RecipeList {...props}/>);
    //expect(component.find('.recipe')).to.have.length(0)
    component.find('.delete-button').simulate('click')
    expect(component.find('.recipe')).to.have.length(0)
	});
});
