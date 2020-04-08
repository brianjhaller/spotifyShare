import React from 'react';
import {StyleSheet, View} from 'react-native';
import TopContainer from './components/topContainer.tsx';

export default function App() {
  return (
    <View style={styles.container}>
      <TopContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
