import React from 'react';
import ReactDOM from 'react-dom';

export class List extends React.Component {
	renderListItem(listItem, id){
		return <ListItem item={listItem} id={id}/>;
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
	render() {
		let item = this.props.item;
		return (
			<div className="todos__item">
				<input type="checkbox" id={this.props.id}/>
				<label htmlFor={this.props.id}>{item.label}</label>
			</div>
			)
	}
}
