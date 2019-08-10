import React, { Component } from 'react';
import { render } from 'react-dom';
import Tooltip from './Tooltip/Tooltip';
import './style.css';

let Input = <input className="test3" placeholder="hover top"/>
class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Tooltip content="Some Content for the tooltip. Some Content for the tooltip. Some Content for the tooltip. Some Content for the tooltip" placement="right" target={<button className="test1">Click</button>} trigger="click"/>
         <Tooltip  content="Some Content for the tooltip" placement="left" target={<button className="test2">Click</button>} trigger="click"/>
        <Tooltip  content="Some Content for the tooltip" placement="top" target={Input} trigger="hover"/>
         <Tooltip  content="Some Content for the tooltip" placement="bottom" target={<button className="test4">hover me</button>} trigger="hover"/>
        
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
