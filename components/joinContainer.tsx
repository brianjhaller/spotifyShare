import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, View, ActivityIndicator } from 'react-native';
import TrackListingBox from './trackListingBoxComponent.tsx';
import TrackSearchBox from './trackSearchBoxComponent.tsx';
import SearchResultsBox from './searchResultsBoxComponent.tsx';
import LogoutComponent from './logoutComponent.tsx';


const JoinContainer = (props) => {

  const [playlistId, setPlaylistId] = useState('');
  const [tracks, setTracks] = useState('');
  const [searchTrack, setSearchTrack] = useState('');
  const [searchType, setSearchType] = useState('Track')
  const [searchResults, setSearchResults] = useState(undefined);

  // run getSpotifyData on load
  useEffect(() => {
    getSpotifyData();
  }, []);

  function getSpotifyData() {
    // get information about the user who just signed in
    if (playlistId === '') {
      fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: { 
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + props.access_token,
        }
      })
      .then(data1 => data1.json())
      .then(res1 => {
        // take their spotify id and save it
        props.setSpotifyId(res1.id);
        // get the playlist uri by the name
        fetch('http://localhost:3000/getPlaylist', {
          method: 'POST',
          headers: { 
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            room: props.roomName,
          })
        })
        .then(data2 => data2.json())
        .then(res2 => {
          let id = res2.playlist.playlist_id;
          setPlaylistId(id);
          getPlaylistTracks(id);
        })
      });
    }
  }

  function getPlaylistTracks(playlistId) {
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'GET',
      headers: { 
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + props.access_token,
      }
    })
    .then(data => data.json())
    .then(res => {
      const trackObjArr = [];
      res.items.forEach((item, idx) => {
        trackObjArr.push({
          _id: idx,
          trackName: item.track.name,
          trackArtist: item.track.artists[0].name,
          addedBy: item.added_by.id,
          trackId: item.track.id
        });
      });
      setTracks(trackObjArr);
    })
  }

  function searchSpotify() {
    console.log("search params:", searchTrack, searchType)
    const searchParam = searchTrack.replace(/\s/g, '%20')
    console.log(`https://api.spotify.com/v1/search?q=${searchParam}&type=${searchType.toLowerCase()}`)
    fetch(`https://api.spotify.com/v1/search?q=${searchParam}&type=${searchType.toLowerCase()}&limit=10`, {
      method: 'GET',
      headers: { 
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + props.access_token,
      }
    })
    .then(data => data.json())
    .then(results => {
      const searchResultsArr = []
      results.tracks.items.forEach((item, idx) => {
        searchResultsArr.push({
          _id: idx,
          trackName: item.name,
          trackUri: item.uri,
          trackArtist: item.artists[0].name,
        })
      })
      setSearchResults(searchResultsArr)
    })
  }

  function addToSpotifyPlaylist(trackUri) {
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: { 
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + props.access_token,
      },
      body: JSON.stringify({uris: trackUri})
    })
    .then(data => data.json())
    .then(res => {
      console.log("hit", res)
    })
  }

  return (
    <>
      {tracks === '' ? 
        (<View style={{height: '100%', justifyContent: 'center'}}>
          <ActivityIndicator size='large' color='rgb(50, 90, 110)' />
        </View>)
        :
        (
        <>
          <TrackListingBox 
            tracks={tracks} 
            roomName={props.roomName}
            getPlaylistTracks={getPlaylistTracks}
            playlistId={playlistId}
          />
          <TrackSearchBox
            searchTrack={searchTrack}
            setSearchTrack={setSearchTrack}
            searchSpotify={searchSpotify}
            searchType={searchType}
            setSearchType={setSearchType}
          />
          <SearchResultsBox
            searchResults={searchResults}
            addToSpotifyPlaylist={addToSpotifyPlaylist}
          />
          <LogoutComponent 
            setLogin={props.setLogin}
          />
        </>
        )
      }
    </>
  )
}

export default JoinContainer;