import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRacesHistory} from '../redux/store/state/races';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootState} from '../redux/store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen = ({route}: Props) => {
  const dispatch = useDispatch();

  const {racerId, familyName, givenName} = route.params;

  console.log(racerId);

  const {racesData, loading} = useSelector(
    (state: RootState) => state.racesData,
  );

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchRacesHistory(racerId));
  }, [racerId, dispatch]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {familyName} {givenName}
      </Text>

      <FlatList
        data={racesData?.MRData?.RaceTable?.Races}
        renderItem={item => (
          <View style={styles.listItem}>
            <View>
              <Text>{item.item.date}</Text>
              <Text>{item.item.season}</Text>
              <Text>{item.item.raceName}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 16,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomPanel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DetailsScreen;
