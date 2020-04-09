import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

const LogoutComponent = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.setLogin(false)}
      >
        <Text style={styles.text}>Log out</Text>
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
  text: {
    color: 'rgb(200, 200, 200)',
    fontSize: 16,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.30)',
    textShadowOffset: {
      width: 1,
      height: 2
    },
    textShadowRadius: 3.84,
  },
});

export default LogoutComponent;