import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';


const GreetingComponent = (props) => {
    console.log(props.name)
  return (
    <View>
        <Text>{props.name ? props.name.id : ''}</Text>
        <Text>{props.wifi ? props.wifi : ''}</Text>
    </View>
  )
}

export default GreetingComponent