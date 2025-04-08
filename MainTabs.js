import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './ScreensPage/HomeScreen';
import GreekScreen from './ScreensPage/GreekScreen';
// import SellScreen from './ScreensPage/SellScreen';
// import SearchScreen from './ScreensPage/SearchScreen';
// import ProfileScreen from './ScreensPage/ProfileScreen';

const Tab = createBottomTabNavigator();

const MainTabs = ({ user }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home">
        {() => <HomeScreen user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Greek">
        {() => <GreekScreen user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Sell">
        {() => <HomeScreen user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Search">
        {() => <HomeScreen user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {() => <HomeScreen user={user} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainTabs;
