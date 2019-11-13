import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Account() {
  return (
    <View style={styles.container}>
      <Text>Your Account</Text>
    </View>
  );
}

Account.navigationOptions = {
  title: 'Account',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
