import React, { Component } from 'react';
import AuthContextProvider from './contexts/AuthContext'
import Routes from './components/Routes';
import './index.css';
class App extends Component {
  state = {  }
  
  render() { 
    return ( 
        <AuthContextProvider>
          <Routes/>  
          
            </AuthContextProvider>
           
    );
  }
}
 
export default App;