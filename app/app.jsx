import React from 'react';
import ReactDOM from 'react-dom';

import {List, ListItem} from './components/list';
import {InputArea} from './components/input';

console.log('hello world');

class Todos extends React.Component {
	renderInputarea(){
		return <InputArea />
	}
	renderList(listItems, props){
		return <List items={listItems} />;
	}
	render() {
	    return (
	      <div className="todos">
	        <h1>Todo List</h1>
	        {this.renderList([
	        	{'label': 'cat'},
	        	{'label': 'dog'},
	        	{'label': 'fish'},
	        	{'label': 'bird'},
	        	{'label': 'hamster'},
	        	{'label': 'rabbit'},
	        	{'label': 'goose'}
	        	])}
	        {this.renderInputarea()}
	      </div>
	    );
  }
}

ReactDOM.render(
  <Todos />,
  document.getElementById('app')
);
