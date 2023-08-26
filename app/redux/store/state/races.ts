import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export type RacesDataType = {
  MRData: {
    RaceTable: {
      Races: {season: string; raceName: string; date: string}[];
      driverId: string;
    };
    total: string;
  };
};

export const fetchRacesHistory = createAsyncThunk(
  'racesData/fetchRacesHistory',
  async driverId => {
    console.log('this is id', driverId);
    const response = await axios(
      `https://ergast.com/api/f1/drivers/${driverId}/results.json`,
    );
    console.log(response.data);
    return response.data;
  },
);

const racesSlice = createSlice({
  name: 'racesData',
  initialState: {
    racesData: <RacesDataType>{},
    loading: false,
    // racesData: [] as {givenName: string}[],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchRacesHistory.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchRacesHistory.fulfilled, (state, action) => {
      state.racesData = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchRacesHistory.rejected, state => {
      state.loading = false;
    });
  },
});

export default racesSlice.reducer;
