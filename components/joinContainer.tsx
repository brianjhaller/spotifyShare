import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import GreetingComponent from './greetingComponent.tsx';

const JoinContainer = (props) => {

  const [playlistUri, setPlaylistUri] = useState('')

  // run getSpotifyData on load
  useEffect(() => {
    getSpotifyData();
  }, []);

  function getSpotifyData() {
    // get information about the user who just signed in
    if (playlistUri === '') {
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
        // take their spotify id and save it
        props.setSpotifyId(res1.id)
        // get the playlist uri by the name
        fetch('http://localhost:3000/getPlaylist', {
          method: 'POST',
          headers: { 
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            room: props.roomName
          })
        })
        .then(data2 => data2.json())
        .then(res2 => {
          let id = res2.playlist.playlist_id
          setPlaylistUri(id)
          getPlaylistTracks(id)
        })
      });
    }
  }

  function getPlaylistTracks(playlistId) {
    console.log('uri', playlistUri)
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'GET',
      headers: { 
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + props.access_token
      }
    })
    .then(data => data.json())
    .then(res => {
      res.items.forEach(item => {
        console.log(item.track.name, '\n', item.added_by.id, '\n', item.track.uri)

      })
    })
  }

  return (
    <View>
      <Text>Joined {props.roomName}!</Text>
    </View>
  )

}

export default JoinContainer;