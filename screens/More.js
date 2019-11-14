import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function More() {
  return (
    <View style={styles.container}>
      <Text>More</Text>
    </View>
  );
}

More.navigationOptions = {
  title: 'More',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
