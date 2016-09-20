import $ from 'jquery';
import React, { Component } from 'react';
import RecipeIngredients from './recipe_ingredients.js';
import RecipeMethod from './recipe_method.js';

export default class RecipeForm extends Component {

	constructor(props) {
	  super(props);
	  this.state = {name: '', category: '', ingredients: [{name: '', unit: '', quantity: ''}], method: ['']} 
		this.componentWillMount = this.componentWillMount.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.initialiseIngredient = this.initialiseIngredient.bind(this);
		this.initialiseMethod= this.initialiseMethod.bind(this);
		this.handleIngredientNameEdit = this.handleIngredientNameEdit.bind(this);
		this.handleMethodStepEdit = this.handleMethodStepEdit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.loadUnitsFromServer()
    this.loadCategoriesFromServer()
  }

  loadUnitsFromServer() {
    $.ajax({
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
  }

  loadCategoriesFromServer() {
    $.ajax({
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
  }

  handleTextChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  initialiseIngredient() {
		var ingredients = this.state.ingredients;
		ingredients.push({name: '', quantity: '', unit: ''})
		this.setState({ingredients: ingredients});
  }

  initialiseMethod() {
		var method = this.state.method;
		method.push(['']);
		this.setState({method: method});
  }

  handleMethodStepEdit(method_step, i) {
	  var method = this.state.method;
	  method[i] = method_step;
	  this.setState({method: method});
  }

  handleIngredientNameEdit(name, i) {
	  var ingredients = this.state.ingredients;
	  ingredients[i].name = name;
	  this.setState({ingredients: ingredients});
  }

  handleSubmit(e) {
    e.preventDefault()
    var name = this.state.name.trim()
    var category = this.state.category.trim()
    var ingredients = this.state.ingredients
    var method = this.state.method
    
		if (!name || !category || !ingredients || !method) {
      return false;
    }

    this.props.onRecipeSubmit({name: name, category: category, ingredients: ingredients, method: method}) 
    this.setState({name: '', category: '', ingredients: [{name: '', quantity: '', unit: ''}], method: ['']}) 
  }

  renderCategories() {
    if (this.state.categories) {
      return this.state.categories.map(function (category, i) {
        return <option key={i} value={category}>{category}</option>
      })
    }
  }

  render() {
    return (
      <form 
				className='recipeForm' 
				onSubmit={this.handleSubmit}>
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
					<option>
						Select a category
					</option>
					{this.renderCategories()}
        </select>
				<RecipeIngredients 
					ingredients={this.state.ingredients} 
					initialiseIngredient={this.initialiseIngredient} 
					handleIngredientNameEdit={this.handleIngredientNameEdit}/>
				<RecipeMethod
					method={this.state.method} 
					initialiseMethod={this.initialiseMethod} 
					handleMethodStepEdit={this.handleMethodStepEdit}/>
				<br></br> 
				<input type='submit' value='Post'/>
			</form>
    );
  }
}
