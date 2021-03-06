//Sempre deixar em primeiro
import 'react-native-gesture-handler';

import React from 'react';
import Routes from './src/routes';
import Icon from 'react-native-vector-icons/FontAwesome';

//Redux
import reducer from './src/reducers/';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

Icon.loadFont();

//Setting Redux
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
