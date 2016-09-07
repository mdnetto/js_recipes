var $ = require('jquery');
var React = require('react');
var RecipeIngredients = require('./recipe_ingredients.js');

var RecipeForm = React.createClass({// eslint-disable-line no-undef
  loadUnitsFromServer: function () {
    $.ajax({// eslint-disable-line no-undef
      url: this.props.units_url,
      dataType: 'json',
      cache: false,
      success: function (units) {
        this.setState({units: units})
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.units_url, status, err.toString())
      }.bind(this)
    })
  },
  loadCategoriesFromServer: function () {
    $.ajax({// eslint-disable-line no-undef

      url: this.props.categories_url,
      dataType: 'json',
      cache: false,
      success: function (categories) {
        this.setState({categories: categories})
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.categories_url, status, err.toString())
      }.bind(this)
    })
  },
  getInitialState: function () {
    return {name: '', category: '', ingredients: [{name: '', unit: '', quantity: ''}]} 
  },
  componentWillMount: function () {
    this.loadUnitsFromServer();
    this.loadCategoriesFromServer();
  },
  handleTextChange: function (e) {
    this.setState({[e.target.name]: e.target.value});
  },
  initialiseIngredient: function() {
	var ingredients = this.state.ingredients; // esp. in dynamic typed languages, it can be helpful to include the type with the name, e.g. ingredientList
	ingredients.push({name: '', quantity: '', unit: ''});
	this.setState({ingredients:  ingredients});
  },
  handleIngredientNameEdit: function(name, i) {
	  var ingredients = this.state.ingredients;
	  ingredients[i].name = name; 
	  this.setState({ingredients:  ingredients});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var name = this.state.name.trim();
    var category = this.state.category.trim();
    var ingredients = this.state.ingredients
    if (!name || !category || !ingredients) {
      return;
    }
	  
    this.props.onRecipeSubmit({name: name, category: category, ingredients: ingredients}) ;
    this.setState(this.getInitialState()) ;
  },
  renderCategories: function () {
    if (this.state.categories) {
      return this.state.categories.map(function (category, i) {
        return <option key={i} value={category}>{category}</option>
      })
    }
  },
  render: function () {
    return (
      <form className='recipeForm' onSubmit={this.handleSubmit}>
        <input
          name='name'
          type='text'
          placeholder='Recipe name'
          value={this.state.name}
          onChange={this.handleTextChange}/>
        <select
          name='category'
          placeholder='Select a category'
          value={this.state.category}
          onChange={this.handleTextChange}>
		  <option>Select a category</option>
          {this.renderCategories()}
        </select>
		<RecipeIngredients ingredients={this.state.ingredients} initialiseIngredient={this.initialiseIngredient} handleIngredientNameEdit={this.handleIngredientNameEdit} />
		<br></br>
		<br></br>
        <input type='submit' value='Post' />
      </form>
    );
  }
});

module.exports = RecipeForm;
