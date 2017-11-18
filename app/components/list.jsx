import React from 'react';
import ReactDOM from 'react-dom';

export class List extends React.Component {
	constructor(props) {
		super(props);

		console.log('list', props);
		this.inputChecked = this.inputChecked.bind(this);
		this.inputUpdated = this.inputUpdated.bind(this);
	}

	inputChecked(i, value){
		console.log('inputChecked', i, value);
		this.props.listItemComplete(i, value);
	}

	inputUpdated(i, value){
		console.log('inputUpdated', i, value);
		this.props.listItemUpdate(i, value);
	}

	renderListItem(listItem, id){
		return (
			<ListItem item={listItem} 
				id={id} 
				onInputChecked={this.inputChecked}
				onInputUpdated={this.inputUpdated} />
				);
	}

	render() {
		let items = this.props.items;
		return (
		<ul className="todos__list">
			{items.map((item, i) => {
				return (
					<li key={i}>
					{this.renderListItem(item, i)}
					</li>
					)
			})}
		</ul>
		)
	}
}

export class ListItem extends React.Component {
	constructor(props) {
		super(props);

		console.log('listitem', props);
		this.state = {
			id: this.props.id,
			value: this.props.item.label,
			label: this.props.item.label,
			checked: false,
			inputDisplay: false
		};
		this.handleEditInputUpdate = this.handleEditInputUpdate.bind(this);
		this.handleCheckboxInput   = this.handleCheckboxInput.bind(this);
		this.clickUpdateBtn        = this.clickUpdateBtn.bind(this);
		this.updateValueByForm     = this.updateValueByForm.bind(this);
	}

	/**
	 * Toggle display state of edit input form
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	handleEditInputUpdate(e) {
		console.log('update input value in state', e.target.value);
		return this.setState({value: e.target.value});
	}

	/**
	 * clear item on clicking checkbox (completed)
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	handleCheckboxInput(e) {
		console.log('input checked');
		console.log(e, this.props.id);
		return this.props.onInputChecked(this.props.id, this.props.item);
	}
	
	/**
	 * toggle display of & enable editing on form
	 * @param  {type} e [event]
	 * @return {function}
	 */
	clickUpdateBtn(e) {
		e.preventDefault();
		console.log('trigger edit listitem field');
		return this.setState({inputDisplay: true});
	}

	/**
	 * update field by submit button
	 * - hide form on update
	 * - submit updated field to state
	 * @param  {type} e [event]
	 * @return {function}
	 */
	updateValueByForm(e) {
		e.preventDefault();
		console.log('update field by form');
		this.props.onInputUpdated(this.state.id, this.state.value);
		return this.setState({
			inputDisplay: false,
			label: this.state.value
		});
	}

	renderEditForm() {
		return (
			<form action=""
				className="listitem__form" 
				onSubmit={this.updateValueByForm}>
				<input type="text"
					className="listitem__input-edit" 
					defaultValue={this.state.value}
					onChange={this.handleEditInputUpdate}
					onKeyDown={this.updateByEnter}
					disabled={!this.state.inputDisplay}/>
				<button type="submit">Update</button>
			</form>
			)
	}

	render() {
		console.log(this.state.inputDisplay);
		let inputDisplayState = this.state.inputDisplay ? '' : 'hidden';
		return (
			<div className="todos__item listitem">
				<input type="checkbox" 
					id={this.state.id} 
					checked={this.state.checked} 
					onChange={this.handleCheckboxInput}/>
				<div className={"listitem__display " + inputDisplayState}>
					<label 
						className="listitem__label"
						htmlFor={this.state.id}>{this.state.label}</label>
					{this.renderEditForm()}
					<a href="#" 
						className="listitem__btn-edit" 
						onClick={this.clickUpdateBtn}>Edit</a>
				</div>
			</div>
			)
	}
}
