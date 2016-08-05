import React from 'react';
import ReactDOM from 'react-dom';
import Login from './src/Login.jsx';

let App = React.createClass({
  render() {
    return (
      <div className="nav">
        <Login name="dfdfa"/>
        <Login name="b"/>
      </div>
    );
  }
});

ReactDOM.render(<App/>, document.getElementById("mainDiv"));