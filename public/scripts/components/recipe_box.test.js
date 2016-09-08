describe('recipe box', () => {

	const recipe_box = require('./recipe_box');
	const sum = require('../sum');

	test('adds 1 + 2 to equal 3', () => {
			expect(sum(1, 2)).toBe(3);
	});

	//test('loads recipes from server', () => {
	//		expect(recipe_box).toBe("<RecipeBox .. >");
	//});

});

