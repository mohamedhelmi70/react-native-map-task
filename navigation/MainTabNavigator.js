import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Explorer from '../screens/Explorer';
import Account from '../screens/Account';
import More from '../screens/More';
import Shop from '../screens/Shop';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ExplorerStack = createStackNavigator(
  {
    Explorer
  },
  config
);

ExplorerStack.navigationOptions = {
  tabBarLabel: 'Explorer',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

ExplorerStack.path = '';

const ShopStack = createStackNavigator(
  {
    Shop
  },
  config
);

ShopStack.navigationOptions = {
  tabBarLabel: 'Shop',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

ShopStack.path = '';

const AccountStack = createStackNavigator(
  {
    Account,
  },
  config
);

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

AccountStack.path = '';

const MoreStack = createStackNavigator(
  {
    More,
  },
  config
);

MoreStack.navigationOptions = {
  tabBarLabel: 'More',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

MoreStack.path = '';

const tabNavigator = createBottomTabNavigator({
  ExplorerStack,
  ShopStack,
  AccountStack,
  MoreStack
});

tabNavigator.path = '';

export default tabNavigator;
