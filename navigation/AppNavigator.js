import { createStackNavigator } from 'react-navigation-stack';

import { AuthSwitchNavigator, MainStackNavigator } from './navigators';

export default createStackNavigator(
  {
    Auth: AuthSwitchNavigator,
    Main: MainStackNavigator
  },
  {
    headerMode: 'none',
    cardStyle: { backgroundColor: '#fff' }
  }
);
