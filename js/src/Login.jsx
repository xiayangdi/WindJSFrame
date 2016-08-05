'use strict';

import React,{Component} from 'react';

class Login extends Component{
  constructor(props){
    super(props);
  };
  render(){
    return(<div>Welcome to login {this.props.name}</div>);
  }
}
export default Login;  