import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, View } from 'react-native';

const TrackSearchBox = (props) => {

  const [selectedValue, setSelectedValue] = useState("java");

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 2, width: '100%'}}>
        <TextInput
          maxLength={24}
          style={styles.modalTextInput}
          onChangeText={name => props.setSearchTrack(name)}
          placeholder={'e.g. Starlight'}
          keyboardType={'default'}
          value={props.searchTrack}
        />
        {/* <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          mode='dropdown'
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker> */}

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
})

export default TrackSearchBox;