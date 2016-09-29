import React, { Component } from 'react';

var heading = {
	color: '#333',
	fontFamily: 'raleway',
	fontSize: '25px',
};

export default class RecipeMethods extends Component {
	constructor(props) {
	  super(props);
		this.initialiseMethodOnEnter = this.initialiseMethodOnEnter.bind(this);
	}

  initialiseMethodOnEnter(e) {
		if (e.keyCode == 13) {
			e.preventDefault()
		  this.props.initialiseMethod();
		}
  }

	
  render() {
    return (
      <div className='recipeMethod' style={heading}>
        <p>Method</p>
					{this.props.method.map((method_step, i) => {
						return(
							<p key={i}>
								<textarea
									autoFocus type='text' 
									value={method_step} 
									onChange = {
										(e) => (
											this.props.handleMethodStepEdit(e.target.value, i)
										)} 
									onKeyDown={this.initialiseMethodOnEnter} 
								/> 
							</p>
						)})
					}
      </div>
    );
  }
}	
