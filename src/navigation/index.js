import React from 'react';

import { Provider as PaperProvider} from 'react-native-paper';

import Routes from './Routes';
import HomeScreen from '../screens/HomeScreen';
import { AuthProvider } from './AuthProvider';

/*
  Wrap all providers area
*/

const Providers = () => {
  return(
    <PaperProvider>
     <AuthProvider>
      <Routes/>
     </AuthProvider>
    </PaperProvider>
  );
}

export default Providers;