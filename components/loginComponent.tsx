import React, { useState } from 'react';
import { StyleSheet, Text, Button, View, Linking } from 'react-native';
import spotifyOauth from '../config.js';

const LoginComponent = (props) => {
  console.log("hit LoginComponent")

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() =>  {
            Linking.addEventListener('url', handleUrl)
            function handleUrl (event) {
              let code = event.url.replace(`${spotifyOauth.redirect}?code=`, '')
              fetch('http://localhost:3000/auth/spotify', {
                method: "POST",
                headers: {
                  'Content-type': 'application/json'
                },
                body: JSON.stringify({ code, redirect_uri: spotifyOauth.redirect, clientId: spotifyOauth.clientId, clientSecret: spotifyOauth.secret }),
              })
              .then(results => results.json())
              .then(data => {
                console.log(data)
                props.setTokenName(data.access_token)
                props.setWifiName(data.wifiName)
                props.setLogin(true);
              })
            }
            Linking.openURL(`https://accounts.spotify.com/authorize?response_type=code&client_id=${spotifyOauth.clientId}&scope=playlist-modify-private%20user-modify-playback-state&redirect_uri=${spotifyOauth.redirect}`)
            Linking.removeEventListener('url', handleUrl)
          }}
          title="Click to Login"
          color='white'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
    paddingBottom: '5%',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    backgroundColor: 'rgb(80, 80, 80)',
    paddingHorizontal: '10%',
    borderRadius: 8,
    margin: 20,
  }
});


export default LoginComponent;