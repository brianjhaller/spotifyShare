import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import GreetingComponent from './greetingComponent.tsx';

const CreatorContainer = (props) => {
    const [playlistUri, setPlaylistUri] = useState('')

    useEffect(() => {
      fetch('http://localhost:3000/verifyRoom', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({ room: props.roomName })
      })
      .then(res => res.json())
      .then(verify => {
        if (!verify.bool) getSpotifyData();
      })
    }, []);

    function getSpotifyData() {
      fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: { 
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + props.access_token
        }
      })
      .then(data1 => data1.json())
      .then(res1 => {
        props.setSpotifyId(res1.id)
        fetch(`https://api.spotify.com/v1/users/${res1.id}/playlists`, {
          method: 'POST',
          headers: { 
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + props.access_token
          },
          body: JSON.stringify({
            name: props.roomName,
            description: "Created by spotifyShare app!"
          })
        })
        .then(data2 => data2.json())
        .then(res2 => {
          console.log(res2)
          setPlaylistUri(res2.uri)
          fetch(`http://localhost:3000/createPlaylist`, {
            method: 'POST',
            headers: { 
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              room: props.roomName,
              playlistId: res2.id,
              creatorId: res1.id
            })
          })
          .then(data3 => data3.json())
          .then(results => {
            console.log(results.results);
          })
        })
      })
    }

    return (
        <>
        <View style={styles.containerTop}>
        {/* <GreetingComponent name={data} wifi={props.wifiName} /> */}
          <Text>{props.spotifyId ? props.spotifyId : ''}</Text>
        </View>
        <View style={styles.containerBottom}>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        props.setWifiName('')
                        props.setLogin(false)
                    }}
                    title="Click to Logout"
                    color='rgb(255, 255, 255)'
                />
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
  containerTop: {
    flex: 3,
    backgroundColor: 'rgb(140, 120, 110)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerBottom: {
    flex: 4,
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

export default CreatorContainer;