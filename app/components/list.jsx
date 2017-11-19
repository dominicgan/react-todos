import React from 'react';
import ReactDOM from 'react-dom';
var keycode = require('keycode');

export class List extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeId: null
		};
		
		this.inputChecked      = this.inputChecked.bind(this);
		this.inputUpdated      = this.inputUpdated.bind(this);
		this.changeActiveField = this.changeActiveField.bind(this);
	}
	
	/**
	 * on clicking checkbox, lift state 
	 * of completed item up to parent obj
	 * @param  {integer} i     [item index]
	 * @param  {object} value [item object]
	 */
	inputChecked(i, value){
		console.log('inputChecked', i, value);
		this.props.listItemComplete(i, value);
	}
	
	/**
	 * on updating input, lift state
	 * of updated item up to parent obj
	 * @param  {integer} i     [item index]
	 * @param  {object} value [item object]
	 */
	inputUpdated(i, value){
		console.log('inputUpdated', i, value);
		this.props.listItemUpdate(i, value);
	}

	/**
	 * Toggle active edit field state
	 * to allow only one field for editing at a time
	 */
	changeActiveField(i) {
		console.log('active input field', i);
		this.setState({
			activeId: i
		});
	}

	renderListItem(listItem, id){
		return (
			<ListItem item={listItem} 
				id={id}
				activeId={this.state.activeId}
				onClickEdit={this.changeActiveField}
				onInputChecked={this.inputChecked}
				onInputUpdated={this.inputUpdated} />
				);
	}

	// remder list container <ul> if items present,
	// else render empty container
	render() {
		let items = this.props.items;
		if (items) {
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
		} else {
			return (
				<div className="todos__empty">
					<span>You have no more items to do. Yay!</span>
				</div>
			)
		}
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
			inputDisplay: false,
			activeId: this.props.activeId
		};

		this.handleEditInputUpdate = this.handleEditInputUpdate.bind(this);
		this.handleCheckboxInput   = this.handleCheckboxInput.bind(this);
		this.clickEditBtn          = this.clickEditBtn.bind(this);
		this.updateValueByForm     = this.updateValueByForm.bind(this);
		this.updateByEnter         = this.updateByEnter.bind(this);
		this.updateProps           = this.updateProps.bind(this);
		this.focusEditInput        = this.focusEditInput.bind(this);
	}

	/**
	 * update state on receiving new props
	 */
	componentWillReceiveProps(nextProps) {
		console.log('compoprops', nextProps);
		this.setState({
			id: nextProps.id,
			value: nextProps.item.label,
			label: nextProps.item.label,
			activeId: nextProps.activeId
		});  
	}

	/**
	 * switch focus to input field on clicking
	 * update button
	 */
	componentDidUpdate() {
		if (this.state.inputDisplay) {
			this.focusEditInput();
		}
	}

	/**
	 * Toggle display state of edit input form
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	handleEditInputUpdate(e) {
		console.log('update input value in state', e.target.value);
		return this.setState({
			value: e.target.value
		});
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
	clickEditBtn(e) {
		e.preventDefault();
		console.log('trigger edit listitem field', this.state.id);
		this.props.onClickEdit(this.state.id);
		return this.setState({
			inputDisplay: true
		});
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
		this.updateProps(this.state.id, this.state.value);
	}
	
	/**
	 * update field by enter
	 * @param  {type} e [event]
	 * @return {function}
	 */
	updateByEnter(e) {
		if (e.keyCode === keycode('enter')) {
			e.preventDefault();
			console.log('keydown', keycode(e), e.target.value);
			this.updateProps(this.state.id, this.state.value);
		}
	}
	
	/**
	 * shared update method
	 * @param  {integer} i   [item index]
	 * @param  {string} val [item label]
	 * @return {function}
	 */
	updateProps(i, val) {
		this.props.onInputUpdated(i, val);
		return this.setState({
			inputDisplay: false,
			label: val
		});
	}

	/**
	 * handler to focus on edit input field 
	 */
	focusEditInput() {
		console.log('focus on edit field', this.fieldEditInput);
	    // Explicitly focus the text input using the raw DOM API
	    this.fieldEditInput.focus();
	}

	/**
	 * shift cursor to end of input field on focus
	 */
	shiftFocusToInputEnd(e) {
		console.log('shiftFocusToInputEnd');
		let val = e.target.value;
		e.target.value = '';
		e.target.value = val;
	}

	renderCheckboxComplete() {
		return (
			<input type="checkbox" 
				className="listitem__input"
				id={'listitem_checkbox_' + this.state.id} 
				checked={this.state.checked} 
				onChange={this.handleCheckboxInput}
				aria-labelledby={'listitem_label_' + this.state.id} />
			)
	}

	// toggle for attribute if is desktop/mobile onload
	// to prevent unintended clicks on mobile
	renderDisplayLabel() {
		let isMob = document.documentElement.classList.contains('touch');

		return (
			<div className="listitem__label" 
				data-tooltip="Click when complete!">
				<label 
					id={'listitem_label_' + this.state.id}

					htmlFor={isMob ? undefined : 'listitem_checkbox_' + this.state.id}>
						{this.state.label}
				</label>
			</div>
			)
	}

	renderEditForm() {
		return (
			<form action=""
				className="listitem__form" 
				onSubmit={this.updateValueByForm}>
				<input type="text"
					className="listitem__input-edit" 
					value={this.state.value}
					onChange={this.handleEditInputUpdate}
					onKeyDown={this.updateByEnter}
					disabled={!this.state.inputDisplay}
					maxLength='88'
					ref={(input) => { this.fieldEditInput = input; }}
					onFocus={this.shiftFocusToInputEnd}
					required />
				<button type="submit" className="btn-update">Update</button>
			</form>
			)
	}

	render() {
		console.log('render', this.state.inputDisplay, this.state.id, this.state.activeId);
		let inputDisplayState = '';

		if (this.state.inputDisplay && this.state.id === this.state.activeId) {
			inputDisplayState = '';	
		} else {
			inputDisplayState = 'hidden';
		}
		return (
			<div className="todos__item listitem">
				{this.renderCheckboxComplete()}
				<div className={"listitem__display " + inputDisplayState}>
					{this.renderDisplayLabel()}
					{this.renderEditForm()}
					<a href="#"
						className="listitem__link-edit" 
						onClick={this.clickEditBtn}>Edit</a>
				</div>
			</div>
			)
	}
}
