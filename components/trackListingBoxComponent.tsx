import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, Text, Button, View, FlatList, RefreshControl } from 'react-native';

const TrackListingBox = (props) => {

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    props.getPlaylistTracks(props.playlistId);
    setRefreshing(false);
  }, [refreshing]);

  function Item(props) {
    return (
      <View style={styles.item}>
        <Text numberOfLines={1} style={{...styles.listText, fontWeight: '700'}}>{props.track.trackName}</Text>
        <Text numberOfLines={1} style={{...styles.listText, fontSize: 16, color: 'rgb(200, 200, 160)'}}>{props.track.trackArtist}</Text>
        <Text numberOfLines={1} style={{...styles.listText, fontSize: 14, color: 'rgb(140, 140, 140)'}}>Added by: {props.track.addedBy}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Current Playlist</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={props.tracks}
          renderItem={({item}) => <Item track={item} />}
          keyExtractor={item => "key" + item._id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <Text style={{...styles.listText, textAlign: 'center', color: 'rgb(100, 100, 100)', marginTop: '5%'}}>
              No tracks added yet...
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
  headerText: {
    color: 'rgb(200, 200, 200)',
    fontSize: 20,
    fontWeight: '600',
    marginTop: '2%',
    textShadowColor: 'rgba(0, 0, 0, 0.40)',
    textShadowOffset: {
      width: 1,
      height: 2
    },
    textShadowRadius: 3.84,
  },
  listText: {
    color: 'rgb(200, 200, 200)',
    fontSize: 16,
  },
});

export default TrackListingBox;