import React, { useState } from 'react';
import { StyleSheet, Text, Button, View, Linking } from 'react-native';
import authHandler from './authHandler.js'

const LoginComponent = (props) => {
  console.log("hit LoginComponent")

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() =>  {
            Linking.addEventListener('url', handleUrl)
            function handleUrl (event) {
              let code = event.url;
              code = code.replace('spotifyshare:/callback?code=', '')
              const redirect_uri = 'spotifyShare:/callback'
              const clientId = '81caa84bfac94356a16975578583e317'
              const clientSecret = 'de80e6f33f23484bb6e01e7064ef1f3f'
              fetch('http://localhost:3000/auth/spotify', {
                method: "POST",
                headers: {
                  'Content-type': 'application/json'
                },
                body: JSON.stringify({ code, redirect_uri, clientId, clientSecret }),
              })
              .then(results => results.json())
              .then(data => {
                console.log(data)
                props.setTokenName(data.access_token)
                props.setWifiName(data.wifiName)
                props.setLogin(true);
              })
            }
            Linking.openURL('https://accounts.spotify.com/authorize?response_type=code&client_id=81caa84bfac94356a16975578583e317&scope=playlist-modify-private&redirect_uri=spotifyShare:/callback')
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