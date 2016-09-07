var $ = require('jquery');
var React = require('react');
var Recipe = require('./recipe.js');

var RecipeList = React.createClass({// eslint-disable-line no-undef
  render: function () {
    var recipes = _.orderBy(this.props.data, ['id'], ['desc'])// eslint-disable-line no-undef
    var recipeNodes = recipes.map(function (recipe) {
      return (
        <Recipe
		  image={recipe.image}
          name={recipe.name}
          key={recipe.id}
          category={recipe.category}
          ingredients={recipe.ingredients}
          method={recipe.method}
        />
      )
    })
    return (
      <div className='recipeList'>
        {recipeNodes}
      </div>
    );
  }
});

module.exports = RecipeList;
