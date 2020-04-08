import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import HeaderComponent from './headerComponent.tsx'
import LoginComponent from './loginComponent.tsx'
import MainContainer from './mainContainer.tsx'


const TopContainer = () => {
    const [isLoggedIn, setLogin] = useState(false)
    const [wifiName, setWifiName] = useState('')
    const [tokenName, setTokenName] = useState('')
    
    return isLoggedIn ? 
        
        <View style={styles.container} >
            <HeaderComponent />
            <MainContainer setLogin={setLogin} wifiName={wifiName} access_token={tokenName} setWifiName={setWifiName} />
        </View>
        : 
        <View style={styles.container} >
            <HeaderComponent />
            <LoginComponent setLogin={setLogin} setTokenName={setTokenName} setWifiName={setWifiName} />
        </View>
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    display: 'flex',
  },
})

export default TopContainer;