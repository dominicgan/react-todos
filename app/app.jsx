import React from 'react';
import ReactDOM from 'react-dom';
import * as $ from 'jquery';

import {List, ListItem} from './components/list';
import {InputArea} from './components/input';

class Todos extends React.Component {
	constructor() {
		super();
		this.state = {
			list: []
		}
		this.handleInputUpdate = this.handleInputUpdate.bind(this);
		this.listRemoveItem    = this.listRemoveItem.bind(this);
		this.listUpdateItem    = this.listUpdateItem.bind(this);
		this.updateToServer    = this.updateToServer.bind(this);
	}

	componentDidMount(){
		$.ajax({
			url: "/data/data.json",
			method: "GET",
			dataType: "json"
		}).done((obj, msg, xhr) => {
			console.log('done');
			console.log(obj, msg, xhr)
			const list = obj;
			return this.setState({list: list});
		}).fail((xhr, msg) => {
			console.log(xhr, msg);
		});
	}

	updateToServer(newList) {
		// do post request
		// on success setstate
		this.setState({list: newList});
	}

	handleInputUpdate(val) {
		let tempList = this.state.list.slice();
		tempList.push({'label': val});
		this.updateToServer(tempList);
	}

	listRemoveItem(i, value) {
		console.log('remove this from list', this.state.list[i]);
		let tempList = this.state.list.filter(function(elem) { 
				return elem.label !== value.label;
			});
		this.updateToServer(tempList);
	}

	listUpdateItem(i, value) {
		console.log('list update item', i, value);
		let tempList = this.state.list.slice();
		tempList[i].label = value;
		this.updateToServer(tempList);
	}

	renderInputarea(){
		return <InputArea onInputChange={this.handleInputUpdate}/>
	}
	
	renderList(listItems, props){
		return (
			<List items={listItems}
				listItemComplete={this.listRemoveItem}
				listItemUpdate={this.listUpdateItem}/>
			);
	}

	render() {
		return (
			<div className="todos">
			<h1 className="todos__title">Todo List</h1>
			{this.renderList(this.state.list)}
			{this.renderInputarea()}
			</div>
			);
	}
}

ReactDOM.render(
	<Todos />,
	document.getElementById('app')
	);
