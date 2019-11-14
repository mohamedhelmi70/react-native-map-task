import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Explore from '../screens/Explorer';
import Account from '../screens/Account';
import More from '../screens/More';
import Shop from '../screens/Shop';

import * as Constants from '../constants/index';

const Colors = Constants.Theme.Colors;

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ExploreStack = createStackNavigator(
  {
    Explore
  },
  config
);

ExploreStack.navigationOptions = {
  tabBarLabel: 'Explor',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="explore"/>
  ),
};

ExploreStack.path = '';

const ShopStack = createStackNavigator(
  {
    Shop
  },
  config
);

ShopStack.navigationOptions = {
  tabBarLabel: 'Shop',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="store" />
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
    <TabBarIcon focused={focused} name="person" />
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
    <TabBarIcon focused={focused} name="more-horiz" />
  ),
};

MoreStack.path = '';

const tabNavigator = createBottomTabNavigator({
  ExploreStack,
  ShopStack,
  AccountStack,
  MoreStack
},{
    tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.tabIconDefault, 
    labelStyle: {
      fontSize: 13,
      marginTop: -2,
    },
    style: {
      height: 55,
      backgroundColor: Colors.white,
      borderTopColor: Colors.tintColor,
      padding: 4,
    },
  }
});

tabNavigator.path = '';

export default tabNavigator;
