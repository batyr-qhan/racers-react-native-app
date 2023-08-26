import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RootStackParamList} from '../../App';
import {fetchRacers} from '../redux/store/state/racers';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store/store';
import {RACERS_PER_PAGE} from '../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({navigation}: Props) {
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();

  const {racers, loading} = useSelector((state: RootState) => state.racers);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchRacers(currentPage * 10));
  }, [currentPage, dispatch]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>
          <ActivityIndicator />;
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={{fontSize: 20}}>Racers List</Text>
      </View>

      <FlatList
        style={styles.list}
        data={racers?.MRData?.DriverTable?.Drivers}
        renderItem={item => (
          <View style={styles.listItem}>
            <View>
              <Text>{item.item.givenName}</Text>
              <Text>{item.item.familyName}</Text>
            </View>
            <View>
              <Button
                title="See Details"
                onPress={() => {
                  navigation.navigate('Details', {
                    racerId: item.item.driverId,
                    givenName: item.item.givenName,
                    familyName: item.item.familyName,
                  });
                }}
              />
            </View>
          </View>
        )}
      />

      <View style={styles.bottomPanel}>
        <Button
          disabled={currentPage === 0}
          title="Prev"
          onPress={() => {
            if (currentPage > 0) {
              setCurrentPage(prev => prev - 1);
            }
          }}
        />

        <Text>
          {currentPage + 1}/
          {Math.round(+racers?.MRData?.total / RACERS_PER_PAGE)}
        </Text>

        <Button
          disabled={
            currentPage + 1 ===
            Math.round(+racers?.MRData?.total / RACERS_PER_PAGE)
          }
          title="Next"
          onPress={() => {
            setCurrentPage(prev => prev + 1);
          }}
        />
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    overflow: 'hidden',
    flex: 1,
  },
  list: {
    marginVertical: 16,
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
