import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function More() {
  return (
    <ScrollView style={styles.container}>
      <Text>More</Text>
    </ScrollView>
  );
}

More.navigationOptions = {
  title: 'More',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
