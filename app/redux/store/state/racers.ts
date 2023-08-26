import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export interface RacerData {
  driverId: number;
  familyName: string;
  givenName: string;
  last_name: string;
  nationality: string;
  dateOfBirth: string;
  url: string;
}

export interface RaceData {}

export const fetchRacers = createAsyncThunk(
  'racers/fetchRacers',
  async (offset: number) => {
    const response = await axios(
      `https://ergast.com/api/f1/drivers.json?offset=${offset}&limit=10`,
    );
    console.log(response.data.MRData.DriverTable.Drivers);
    return response.data?.MRData?.DriverTable?.Drivers as RacerData[];
  },
);

const racersSlice = createSlice({
  name: 'racers',
  initialState: {
    racers: [] as RacerData[],
    loading: false,
    // races: [] as {givenName: string}[],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchRacers.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchRacers.fulfilled, (state, action) => {
      state.racers = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchRacers.rejected, state => {
      state.loading = false;
    });
  },
});

export default racersSlice.reducer;
