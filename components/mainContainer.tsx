import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import GreetingComponent from './greetingComponent.tsx';

const MainContainer = (props) => {
    console.log("hit MainContainer")
    const [data, updateData] = useState(undefined);

    useEffect(() => {
        return !data ? getSpotifyData() : undefined
    })

    const getSpotifyData = () => {
      fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: { 
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + props.access_token
        }
      })
      .then(data => data.json())
      .then(res => {
        console.log(res)
        updateData(res)
        fetch('https://api.spotify.com/v1/me', {
          method: 'GET',
          headers: { 
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + props.access_token
          }
        })
        .then(data => data.json())
        .then(res => {
          console.log(res)
        })
      })
    }

    return (
        <>
        <View style={styles.containerTop}>
        <GreetingComponent name={data} wifi={props.wifiName} />
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

export default MainContainer;