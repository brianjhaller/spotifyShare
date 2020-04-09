import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Linking, Modal, TextInput, Alert } from 'react-native';

export default CreateRoomModal = (props) => {

    const checkIfRoomExists = () => {
      let data = undefined
      fetch('http://localhost:3000/verifyRoom', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({ room: props.roomName })
      })
      .then(res => res.json())
      .then(verify => {
        if (!verify.bool) {
          props.setPlaylistCreator(true);
          props.startSpotifyOauth('playlist-modify-public%20user-modify-playback-state%20user-read-private');
        }
        else {
          Alert.alert('Room name already exists');
        }
      })
    }

    return(
      <Modal
        animationType='fade'
        transparent={true}
        visible={props.createModalVisible}
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
                onChangeText={name => props.onChangeRoomName(name)}
                placeholder={'e.g. Spotify Office Party'}
                keyboardType={'default'}
                value={props.roomName}
              />
            </View>
            <View style={{flex: 4, width: '100%'}}>
              <TouchableOpacity
                style={{...styles.modalButton, height: '70%', backgroundColor: 'rgb(50, 90, 110)'}}
                onPress={() => {
                  checkIfRoomExists();
                }}
              >
                <Text style={{...styles.buttonText, fontWeight: '600', fontSize: 18}}>Create room and log in to Spotify</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, width: '100%'}}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  props.setCreateModalVisible(!props.createModalVisible);
                }}
              >
                <Text style={{...styles.buttonText, fontWeight: '300', fontSize: 18}}>Return</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    height: '100%'
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
    height: '75%',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center',
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
})