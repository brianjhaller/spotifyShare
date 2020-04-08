import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Linking, Modal, TextInput } from 'react-native';
import spotifyOauth from '../config.js';

const LoginComponent = props => {
  console.log("hit LoginComponent")

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [joinModalVisibile, setJoinModalVisible] = useState(false);
  const [roomName, onChangeRoomName] = useState('');

  const startSpotifyOauth = scopes => {             
    Linking.addEventListener('url', handleUrl)
    const handleUrl = event => {
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
    Linking.openURL(`https://accounts.spotify.com/authorize?response_type=code&client_id=${spotifyOauth.clientId}&scope=${scopes}&redirect_uri=${spotifyOauth.redirect}`)
    Linking.removeEventListener('url', handleUrl)
  } 

  return (
    <View style={styles.container}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={createModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalContainer}>
          <View style={{...styles.modalView, backgroundColor: 'rgb(80, 100, 100)',}}>
            <View style={{flex: 1.5}}>
              <Text style={styles.buttonText}>Enter a name for your room:</Text>
            </View>
            <View style={{flex: 2, width: '100%'}}>
              <TextInput
                maxLength={24}
                style={styles.modalTextInput}
                onChangeText={text => onChangeRoomName(text)}
                placeholder={'e.g. Spotify Office Party'}
                keyboardType={'default'}
                value={roomName}
              />
            </View>
            <View style={{flex: 4, width: '100%'}}>
              <TouchableOpacity
                style={{...styles.modalButton, height: '70%', backgroundColor: 'rgb(50, 90, 110)'}}
                onPress={() => {
                  startSpotifyOauth('playlist-modify-private%20user-modify-playback-state');
                }}
              >
                <Text style={{...styles.buttonText, fontWeight: '600', fontSize: 18}}>Create room and log in to Spotify</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, width: '100%'}}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setCreateModalVisible(!createModalVisible);
                }}
              >
                <Text style={{...styles.buttonText, fontWeight: '300', fontSize: 18}}>Return</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.instructionText}>
        <Text>Creating a room will create a new public playlist in your Spotify account. Set a room name and anyone with the room name can add their own tracks to your list!</Text>
      </View>
      <TouchableOpacity
        onPress={() =>  {
          setCreateModalVisible(true);
        }}
        style={{...styles.button, backgroundColor: 'rgb(80, 80, 80)'}}
      >
        <Text style={styles.buttonText}>Create a Playlist Room</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>  {
          startSpotifyOauth('scopes')
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
  },
  instructionText: {
    width: '90%',
    alignItems: 'center',
    margin: '5%',
    flex: 6, 
  },
  modalContainer: {
    justifyContent: 'center',
    flex: 1
  },
  modalButton: {
    backgroundColor: 'rgb(80, 80, 80)',
    width: '100%',
    borderRadius: 8,
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
  modalTextInput: {
    width: '100%',
    height: '60%',
    borderRadius: 8, 
    borderColor: 'rgb(80, 80, 80)', 
    backgroundColor: 'rgb(87, 100, 100)',
    borderWidth: 2,
    paddingHorizontal: '3%',
    color: 'rgb(200, 200, 200)',
    fontSize: 18,
    textAlign: 'center',
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
  modalView: {
    display: 'flex',
    margin: 20,
    height: '55%',
    borderRadius: 8,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalButtonText: {
    color: 'rgb(200, 200, 200)',
    fontSize: 18,
    fontWeight: '300',
  },
});


export default LoginComponent;