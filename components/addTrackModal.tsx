import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Linking, Modal, TextInput, Alert } from 'react-native';

export default AddTrackModal = (props) => {
  return(
    <Modal
      animationType='fade'
      transparent={true}
      visible={props.addTrackModalVisible}
    >
      <View style={styles.modalContainer}>
        <View style={{...styles.modalView, backgroundColor: 'rgb(80, 100, 100)',}}>
          <View style={styles.detailsContainer}>
            <Text style={styles.addText}>Add {props.trackToAdd.trackName} by {props.trackToAdd.trackArtist} to playlist?</Text> 
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={{...styles.modalButton, backgroundColor: 'rgb(50, 90, 110)'}}
              onPress={() => props.addToSpotifyPlaylist(props.trackToAdd.trackUri)}
            >
              <Text style={{ ...styles.modalButtonText, fontWeight: '800'}}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => props.setAddTrackModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    display: 'flex',
    margin: 6,
    height: '20%',
    borderRadius: 8,
    paddingHorizontal: '10%',
    paddingVertical: '4%',
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
  detailsContainer: {
    flex: 2,
  },
  buttonContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  modalButton: {
    backgroundColor: 'rgb(80, 80, 80)',
    width: '55%',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2
    },
    marginHorizontal: '2%',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center',
  },
  addText: {
    color: 'rgb(170, 170, 170)',
    fontSize: 20,
    fontWeight: '600',
    marginTop: '5%',
    textShadowColor: 'rgba(0, 0, 0, 0.40)',
    textShadowOffset: {
      width: 1,
      height: 2
    },
    textShadowRadius: 3.84,
  },
  modalButtonText: {
    color: 'rgb(200, 200, 200)',
    fontSize: 16,
  }
})
