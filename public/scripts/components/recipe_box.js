var $ = require('jquery');
var React = require('react');
var RecipeForm = require('./recipe_form.js');
var RecipeList = require('./recipe_list.js');

var RecipeBox = React.createClass({ // eslint-disable-line no-undef
  loadRecipesFromServer: function () {
    $.ajax({ // eslint-disable-line no-undef
      url: this.props.recipes_url,
      dataType: 'json',
      cache: false,
      success: function (recipes) {
        this.setState({recipes: recipes})
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.recipes_url, status, err.toString())
      }.bind(this)
    })
  },
  handleRecipeSubmit: function (recipe) {
    $.ajax({// eslint-disable-line no-undef
      url: this.props.recipes_url,
      dataType: 'json',
      type: 'POST',
      data: recipe,
      success: function (recipes) {
        this.setState({recipes: recipes})
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.recipes_url, status, err.toString())
      }.bind(this)
    })
  },
  getInitialState: function () {
    return {recipes: []}
  },
  componentDidMount: function () {
    this.loadRecipesFromServer()
    setInterval(this.loadRecipesFromServer, this.props.pollInterval)
  },
  render: function () {
    return (
      <div className='recipeBox'>
        <h1>Recipes</h1>
        <RecipeForm onRecipeSubmit={this.handleRecipeSubmit} categories_url='api/categories' units_url='api/units' />
        <RecipeList data={this.state.recipes} />
      </div>
    );
  }
});

module.exports = RecipeBox;
