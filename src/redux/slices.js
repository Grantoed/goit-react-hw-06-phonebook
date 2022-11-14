import { createSlice, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { nanoid } from 'nanoid';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  reducers: {
    add: {
      reducer(state, action) {
        state.unshift(action.payload);
      },
      prepare(name, number) {
        return {
          payload: {
            id: nanoid(3),
            name,
            number,
          },
        };
      },
    },
    remove: {
      reducer(state, action) {
        return state.filter(contact => contact.id !== action.payload.id);
      },
      prepare(id) {
        return {
          payload: {
            id,
          },
        };
      },
    },
  },
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter(state, action) {
      return (state = action.payload);
    },
  },
});

const persistConfig = {
  key: 'filter',
  storage,
};

const contactsReducer = contactsSlice.reducer;
const filterReducer = filterSlice.reducer;

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const { add, remove } = contactsSlice.actions;
export const { changeFilter } = filterSlice.actions;
