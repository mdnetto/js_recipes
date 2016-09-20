import React from 'react'
import RecipeList from '../public/scripts/components/recipe_list'
import renderer from 'react-test-renderer'
import fs from 'fs'

describe('recipe list', () => {
  
  const data = JSON.parse(fs.readFileSync('./tests/fake_recipes.json'))
  const numRecipes = data.length

  it('displays the right number of recipes', () => { 
    const component = renderer.create(
      <RecipeList recipes_url='/fake/' data={data} />
    )
    expect(component.toJSON().children.length).toBe(numRecipes)
  })
  
  it('removes deleted ones', () => { 
    const component = renderer.create(
      <RecipeList recipes_url='/fake/' data={data} />
    )
    console.log(component.toJSON().children[0].props)
    expect(component.toJSON().children.length).toBe(numRecipes - 1)
  })
  
});
