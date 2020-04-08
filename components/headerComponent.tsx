import React, { useState } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';


const HeaderContainer = (props) => {
    console.log("hit HeaderContainer")
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Spotify Communal Playlist</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(50, 90, 80)',
    alignItems: 'center',
  },
  text: {
    marginTop: '15%',
    color: 'rgb(200, 200, 200)',
    fontSize: 24,
    fontWeight: '800',
  }
});


export default HeaderContainer;