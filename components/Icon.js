 import React from 'react';
import { MaterialIcons, MaterialCommunityIcons,  } from '@expo/vector-icons';

import * as Constants from '../constants';

export default function Icon ( props ) {
  
  const Colors = Constants.Theme.Colors;
  
  switch( props.type ) {
    case 'MaterialIcons':
      return (
        <MaterialIcons
          name={props.name}
          size={26}
          style={{ marginBottom: -5 }}
          color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      );
    case 'MaterialCommunityIcons':
      return (
        <MaterialCommunityIcons
          name={props.name}
          size={props.size}
          style={props.style}
          color={props.color}
        />
      );
  }
};
