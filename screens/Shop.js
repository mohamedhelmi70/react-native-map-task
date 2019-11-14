import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Shop( props ) {
  
  return (
    <View style={styles.container}>
      <Text> Shop </Text>
    </View>
  );

}

Shop.navigationOptions = {
  title: 'Shop',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
