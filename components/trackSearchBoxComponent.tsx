import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const TrackSearchBox = (props) => {

  const onPress = () => {
    props.setSearchType(props.searchType === 'Track' ? 'Artist' : 'Track'); 
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Search for tracks or artists to add:</Text>
      <View style={styles.searchBarContainer}>
        <TextInput
          maxLength={24}
          style={styles.textInput}
          onChangeText={name => props.setSearchTrack(name)}
          placeholder={'e.g. Starlight'}
          keyboardType={'default'}
          value={props.searchTrack}
        />
        <TouchableOpacity
          style={styles.buttonToggle}
          onPress={onPress}
        >
          <Text style={{...styles.buttonText, fontSize: 17}}>{props.searchType}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.buttonSubmit}
        onPress={props.searchSpotify}
      >
        <Text style={{...styles.buttonText, fontWeight: '800' }}>Search</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  searchBarContainer: {
    display: 'flex',
    width: '95%',
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: '2.5%',
    marginVertical: '2.5%',
  },
  textInput: {
    flex: 4,
    borderRadius: 8, 
    borderColor: 'rgb(50, 90, 110)',
    backgroundColor: 'rgb(180, 180, 180)',
    borderWidth: 2,
    color: 'rgb(50, 50, 50)',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonToggle: {
    flex: 1,
    backgroundColor: 'rgb(80, 80, 80)',
    width: '100%',
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
  headerText: {
    color: 'rgb(200, 200, 200)',
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
  buttonSubmit: {
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
})

export default TrackSearchBox;