import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { config } from '../../config';

interface ZnsDomainDescriptor {
  route: string,
}

export interface ZnsState {
  value: ZnsDomainDescriptor,
}

const initialState: ZnsState = {
  value: { route: config.defaultZnsRoute },
};

const slice = createSlice({
  name: 'zns',
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<string>) => {
      state.value = { route: action.payload };
    },
    receive: (state, action: PayloadAction<ZnsDomainDescriptor>) => {
      state.value = action.payload;
    },
  },
});

export const { receive, setRoute } = slice.actions;
export const { reducer } =  slice;