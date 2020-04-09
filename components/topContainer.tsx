import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import HeaderComponent from './headerComponent.tsx'
import LoginComponent from './loginComponent.tsx'
import CreatorContainer from './creatorContainer.tsx'
import JoinContainer from './joinContainer.tsx'

const TopContainer = () => {
  const [isLoggedIn, setLogin] = useState(false);
  const [isPlaylistCreator, setPlaylistCreator] = useState(false);
  const [wifiName, setWifiName] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [roomName, onChangeRoomName] = useState('');
  const [spotifyId, setSpotifyId] = useState(undefined);
  const [altText, setAltText] = useState('')
    
  return isLoggedIn ? 
    (isPlaylistCreator ?
      (<View style={styles.container} >
        <HeaderComponent />
        <CreatorContainer 
          setLogin={setLogin} 
          wifiName={wifiName} 
          access_token={tokenName} 
          setWifiName={setWifiName} 
          roomName={roomName}
          spotifyId={spotifyId}
          setSpotifyId={setSpotifyId} 
          setPlaylistCreator={setPlaylistCreator}
        />
      </View>)
      :
      (<View style={styles.container} >
        <HeaderComponent altText={altText} />
        <JoinContainer 
          setLogin={setLogin} 
          wifiName={wifiName} 
          access_token={tokenName} 
          setWifiName={setWifiName}
          roomName={roomName}
          spotifyId={spotifyId}
          setSpotifyId={setSpotifyId} 
          setPlaylistCreator={setPlaylistCreator}
        />
      </View>))
    : 
    (<View style={styles.container} >
      <HeaderComponent />
      <LoginComponent 
        setLogin={setLogin} 
        setTokenName={setTokenName} 
        setWifiName={setWifiName} 
        setPlaylistCreator={setPlaylistCreator} 
        roomName={roomName} 
        onChangeRoomName={onChangeRoomName}
        setAltText={setAltText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    display: 'flex',
  },
})

export default TopContainer;