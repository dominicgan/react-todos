import React from 'react';
import ReactDOM from 'react-dom';
import * as $ from 'jquery';

import {List, ListItem} from './components/list';
import {InputArea} from './components/input';

console.log('hello world');

class Todos extends React.Component {
	constructor() {
		super();
		this.state = {
			list: []
		}
		this.handleInputUpdate = this.handleInputUpdate.bind(this);
		this.listRemoveItem = this.listRemoveItem.bind(this);
		this.listUpdateItem = this.listUpdateItem.bind(this);
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
			return this.setState({list});
		}).fail((xhr, msg) => {
			console.log(xhr, msg);
		});
	}

	handleInputUpdate(val) {
		let tempList = this.state.list.slice();
		tempList.push({'label': val});
		this.setState({list: tempList});
	}

	listRemoveItem(i, value) {
		let tempList = this.state.list.slice();
		tempList.splice(i, 1);
		this.setState({'list': tempList});
	}

	listUpdateItem(i, value) {
		console.log('list update item', i, value);

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
			<h1>Todo List</h1>
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
