import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';


const RoomNameComponent = (props) => {
  return (
    <View>
        <Text>{props.name ? props.name.id : ''}</Text>
        <Text>{props.wifi ? props.wifi : ''}</Text>
    </View>
  )
}

export default RoomNameComponent;