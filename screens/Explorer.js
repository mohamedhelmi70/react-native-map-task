import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Explorer() {
  return (
    <View style={styles.container}>
      <Text>Map</Text> 
    </View>
  );
}

Explorer.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
