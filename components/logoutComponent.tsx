import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

const LogoutComponent = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.setLogin(false)}
      >
        <Text>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 0.2,
    width: '80%',
    marginHorizontal: '10%',
    marginVertical: '3%',
  },
  button: {
    flex: 1,
    backgroundColor: 'rgb(80, 100, 100)',
    width: '95%',
    borderRadius: 8,
    marginHorizontal: '1%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center',
  },
});

export default LogoutComponent;