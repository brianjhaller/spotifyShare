import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, Text, FlatList, TouchableOpacity, View } from 'react-native';
import AddTrackModal from './addTrackModal.tsx';

const SearchResultsBox = (props) => {

  const [addTrackModalVisible, setAddTrackModalVisible] = useState(false);
  const [trackToAdd, setTrackToAdd] = useState(false);

  function Item(props) {
    return (
      <TouchableOpacity 
        style={styles.item}
        onPress={
          () => {
            setTrackToAdd(props.searchResults);
            setAddTrackModalVisible(true);
          }
        }
      >
        <Text numberOfLines={1} style={{...styles.listText, fontWeight: '700'}}>{props.searchResults.trackName}</Text>
        <Text numberOfLines={1} style={{...styles.listText, fontSize: 16, color: 'rgb(200, 200, 160)'}}>{props.searchResults.trackArtist}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <AddTrackModal
        addTrackModalVisible={addTrackModalVisible}
        setAddTrackModalVisible={setAddTrackModalVisible}
        trackToAdd={trackToAdd}
        addToSpotifyPlaylist={props.addToSpotifyPlaylist}
      />
      <View style={styles.listContainer}>
        <FlatList
          data={props.searchResults}
          renderItem={({item}) => <Item searchResults={item} />}
          keyExtractor={item => "key" + item._id}
          ListEmptyComponent={
            <Text style={{...styles.listText, textAlign: 'center', color: 'rgb(100, 100, 100)', marginTop: '5%'}}>
              Nothing searched yet...
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  )  
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 2,
  },
  listContainer: {
    flex: 1,
    borderWidth: 2,
    width: '95%',
    marginHorizontal: '2.5%',
    marginTop: '2%',
    borderColor: 'rgb(50, 90, 110)',
    borderRadius: 8,
    backgroundColor: 'rgb(180, 180, 180)'
  },
  listText: {
    color: 'rgb(200, 200, 200)',
    fontSize: 16,
  },
  item: {
    backgroundColor: 'rgb(50, 90, 110)',
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 6,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.35,
    shadowRadius: 1.84,
  },
});

export default SearchResultsBox;