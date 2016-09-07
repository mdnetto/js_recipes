var React = require('react');

var recipeHeading = {
	color: '#657b83'
};

var Recipe = React.createClass({// eslint-disable-line no-undef
  render: function () {
    return (
      <div className='recipe'>
        <h2 className='recipeName' style={recipeHeading}>
          {this.props.name}
        </h2>
        <p className='recipeCategory'>
          {this.props.category}
        </p>
        <ul>
          {this.props.ingredients.map(function (ingredient, i) {
            return <li key={i}>{ingredient.quantity} {ingredient.unit}, {ingredient.name} </li>
          })}
        </ul>
          {this.props.method}
      </div>
    );
  }
});

module.exports = Recipe;

