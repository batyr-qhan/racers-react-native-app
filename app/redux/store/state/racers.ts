import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {RACERS_PER_PAGE} from '../../../constants';

type RacerType = {
  driverId: number;
  familyName: string;
  givenName: string;
  last_name: string;
  nationality: string;
  dateOfBirth: string;
  url: string;
};

export type RacerDataType = {
  MRData: {
    DriverTable: {
      Drivers: RacerType[];
    };
    total: string;
  };
};

export interface RaceData {}

export const fetchRacers = createAsyncThunk(
  'racers/fetchRacers',
  async (offset: number) => {
    const response = await axios(
      `https://ergast.com/api/f1/drivers.json?offset=${offset}&limit=${RACERS_PER_PAGE}`,
    );
    return response.data as RacerDataType;
  },
);

const racersSlice = createSlice({
  name: 'racers',
  initialState: {
    racers: {} as RacerDataType,
    loading: false,
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
