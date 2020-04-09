import React, { useState } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';


const HeaderContainer = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.altText ? "Room: " + props.altText : 'Spotify Communal Playlist'}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: '4%',
    backgroundColor: 'rgb(80, 100, 100)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgb(50, 70, 70)'
  },
  text: {
    marginTop: '15%',
    color: 'rgb(200, 200, 200)',
    fontSize: 24,
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.40)',
    textShadowOffset: {
      width: 1,
      height: 2
    },
    textShadowRadius: 3.84,
  }
});


export default HeaderContainer;