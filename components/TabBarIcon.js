import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import * as Constants from '../constants';

export default function TabBarIcon(props) {
  
  const Colors = Constants.Theme.Colors;

  return (
    <MaterialIcons
      name={props.name}
      size={26}
      style={{ marginBottom: -5 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
