import React from 'react';
import ReactDOM from 'react-dom';
var keycode = require('keycode');

export class InputArea extends React.Component {
	constructor(props) {
		super(props);

		console.log('inputarea', props);
		this.state = {
			input: ''
		};
		this.updateStateInput = this.updateStateInput.bind(this);
		this.submitByEnter    = this.submitByEnter.bind(this);
		this.submitByForm     = this.submitByForm.bind(this);
	}

	updateStateInput(e) {
		console.log('update input state', e);
		this.setState({input: e.target.value});
	}

	submitByForm(e) {
		e.preventDefault();
		console.log('click');
		if (this.state.input !== '') {
			this.props.onInputChange(this.state.input);
			this.setState({input: ''});
		}
	}

	submitByEnter(e) {
		if (e.keyCode === keycode('enter')) {
			console.log('keydown', keycode(e), e.target.value);
			if (this.state.input !== '') {
				this.props.onInputChange(this.state.input);
				this.setState({input: ''});
			}
		}
	}

	renderInput() {
		return (
			<input type="text" value={this.state.input}
				onChange={this.updateStateInput}
				onKeyDown={this.submitByEnter}/>
			)
	}

	render() {
		return (
			<form className="todos__input" action="" onSubmit={this.submitByForm}>
				{this.renderInput()}
				<button type='submit'>Add</button>
			</form>
			)
	}
}
