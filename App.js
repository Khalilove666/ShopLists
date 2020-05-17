import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './store';

import {RootNav} from './navigation';

const store = createStore(allReducers);

const App = () => {
  return (
    <Provider store={store}>
      {/* <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'}/> */}
      <RootNav/>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default App;
