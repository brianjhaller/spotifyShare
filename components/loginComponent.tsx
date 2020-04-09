import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Linking, Modal, TextInput } from 'react-native';
import spotifyOauth from '../config.js';
import CreateRoomModal from './createRoomModal.tsx'
import JoinRoomModal from './joinRoomModal.tsx'

const LoginComponent = props => {

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [joinModalVisible, setJoinModalVisible] = useState(false);

  const startSpotifyOauth = scopes => {         
    Linking.addEventListener('url', handleUrl)
    function handleUrl (event) {
      let code = event.url.replace(`spotifyshare:/callback?code=`, '')
      fetch('http://localhost:3000/auth/spotify', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ code, redirect_uri: spotifyOauth.redirect, clientId: spotifyOauth.clientId, clientSecret: spotifyOauth.secret }),
      })
      .then(results => results.json())
      .then(data => {
        props.setTokenName(data.access_token)
        props.setWifiName(data.wifiName)
        props.setLogin(true);
        props.setAltText(props.roomName)
        Linking.removeEventListener('url', handleUrl)
      })
    }
    Linking.openURL(`https://accounts.spotify.com/authorize?response_type=code&client_id=${spotifyOauth.clientId}&scope=${scopes}&redirect_uri=${spotifyOauth.redirect}`)
  } 

  return (
    <View style={styles.container}>
      <CreateRoomModal 
        setCreateModalVisible={setCreateModalVisible} 
        createModalVisible={createModalVisible} 
        roomName={props.roomName} 
        onChangeRoomName={props.onChangeRoomName} 
        startSpotifyOauth={startSpotifyOauth} 
        setLogin={props.setLogin} 
        setPlaylistCreator={props.setPlaylistCreator}/>
      <JoinRoomModal 
        setJoinModalVisible={setJoinModalVisible} 
        joinModalVisible={joinModalVisible} 
        roomName={props.roomName} 
        onChangeRoomName={props.onChangeRoomName} 
        startSpotifyOauth={startSpotifyOauth} 
        setLogin={props.setLogin}/>
      <View style={styles.instructionTextContainer}>
        <Text style={styles.instructionText}>Creating a room will create a new public playlist in your Spotify account. Set a room name and anyone with the room name can add their own tracks to your list!</Text>
      </View>
      <TouchableOpacity
        onPress={() =>  {
          setCreateModalVisible(true);
        }}
        style={{...styles.button, backgroundColor: 'rgb(50, 90, 110)'}}
      >
        <Text style={styles.buttonText}>Create a Playlist Room</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>  {
          setJoinModalVisible(true);
        }}
        style={{...styles.button, backgroundColor: 'rgb(80, 100, 100)'}}
      >
        <Text style={styles.buttonText}>Join a Playlist Room</Text>
      </TouchableOpacity>
    
      <View style={{flex: 6}}>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
    paddingBottom: '5%',
    justifyContent: 'center',
    backgroundColor: 'rgb(160, 160, 160)'
  },
  instructionTextContainer: {
    width: '85%',
    alignItems: 'center',
    margin: '7.5%',
    flex: 6,
  },
  instructionText: {
    fontSize: 16
  },
  button: {
    flex: 2,
    paddingVertical: '10%',
    borderRadius: 8,
    marginHorizontal: '7%',
    marginVertical: '4%',
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
  buttonText: {
    color: 'rgb(200, 200, 200)',
    fontSize: 23,
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.30)',
    textShadowOffset: {
      width: 1,
      height: 2
    },
    textShadowRadius: 3.84,
  },

});


export default LoginComponent;