import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigatorProduct from './android/app/src/components/buoi6/AppNavigatorProduct'; 
import AppTabs from './android/app/src/components/buoi6/AppTabs';
import RootNavigator from './android/app/src/components/buoi6/RootNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
