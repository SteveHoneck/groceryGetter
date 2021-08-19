import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore(); //Call the function 'ConfigureStore' from the 'configureStore' file. This creates the Redux store and places it in vairable 'store'

export default function App() {
  return (
    <Provider store={store} /*'Provider' component makes the Redux store available to all child components, in this case <Main> and all of its children*/>
      <Main />
    </Provider>  
  );
}

