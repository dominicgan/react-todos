import React from 'react';
import ReactDOM from 'react-dom';

export class InputArea extends React.Component {
	renderSubmit() {
		return (
			<button type='submit'>
			Add
			</button>
			)

	}
	render() {
		return (
			<div className="todos__input">
				<input type="text"/>
				{this.renderSubmit()}
			</div>
			)
	}
}
